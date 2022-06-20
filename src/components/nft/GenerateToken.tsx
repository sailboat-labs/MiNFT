/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-async-promise-executor */
import { Dialog, Transition } from "@headlessui/react";
import { createCanvas, loadImage } from "canvas";
import chalk from "chalk";
import keccak256 from "keccak256";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGeneratedImages, getLayers } from "redux/reducers/selectors/layers";
import {
  addGeneratedImage,
  clearGeneratedImages,
} from "redux/reducers/slices/generated-images";

import { IGeneratedTokens } from "@/interfaces";

export default function GenerateToken() {
  const [selectedToken, setSelectedToken] = useState<IGeneratedTokens>();
  const generatedTokens: IGeneratedTokens[] = useSelector(getGeneratedImages);

  const layers = useSelector(getLayers);

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const dispatch = useDispatch();
  const background = {
    generate: true,
    brightness: "100%",
  };
  const emptyLayerName = "NONE";
  const startIndex = 0;
  const shuffleLayerConfigurations = false;

  const layerConfigurations = [
    {
      growEditionSizeTo: 64,
      resetNameIndex: false,
      namePrefix: "NZMX Club", // Use to add a name to Metadata `name:`
      layersOrder: [
        { name: "Background" },
        { name: "Skin" },
        { name: "Eyes" },
        { name: "Clothes" },
        { name: "Head Accessory" },
        { name: "Bling" },
      ],
    },
  ];
  const incompatible: any = {
    //   Red: ["Dark Long"],
    //   // directory incompatible with directory example
    //   White: ["rare-Pink-Pompadour"],
  };
  const forcedCombinations: any = {
    // floral: ["MetallicShades", "Golden Sakura"],
  };
  const hashImages = true;
  const extraMetadata = {};
  const debugLogs = true;

  const uniqueDnaTorrance = 10000;
  const description =
    "This is the description of your NFT project, remember to replace this";
  const baseUri = "ipfs://NewUriToReplace";

  const outputJPEG = false; // if false, the generator outputs png's

  const format = {
    width: 1024,
    height: 1024,
    weight: 1,
    smoothing: true, // set to false when up-scaling pixel art.
  };
  const _layers: any[] = [];

  const canvas = createCanvas(format.width, format.height);
  const ctxMain = canvas.getContext("2d");
  ctxMain.imageSmoothingEnabled = format.smoothing;
  const extraAttributes = () => [
    // Optionally, if you need to overwrite one of your layers attributes.
    // You can include the same name as the layer, here, and it will overwrite
    //
    // {
    // trait_type: "Bottom lid",
    //   value: ` Bottom lid # ${Math.random() * 100}`,
    // },
    // {
    //   display_type: "boost_number",
    //   trait_type: "Aqua Power",
    //   value: Math.random() * 100,
    // },
    // {
    //   display_type: "boost_number",
    //   trait_type: "Health",
    //   value: Math.random() * 100,
    // },
    // {
    //   display_type: "boost_number",
    //   trait_type: "Mana",
    //   value: Math.floor(Math.random() * 100),
    // },
  ];
  const metadataList: any = [];
  const rarityDelimiter = "#";
  let attributesList: any = [];
  const traitValueOverrides = {
    Helmet: "Space Helmet",
    "gold chain": "GOLDEN NECKLACE",
  };
  const dnaList = new Set();
  const DNA_DELIMITER = "*";

  const zflag = /(z-?\d*,)/;

  const getRarityWeight = (_path: string) => {
    // check if there is an extension, if not, consider it a directory
    const exp = /#(\d*)/;
    const weight = exp.exec(_path);
    const weightNumber = weight ? Number(weight[1]) : null;
    if (!weightNumber || isNaN(weightNumber)) {
      return "required";
    }
    return weightNumber;
  };

  const cleanDna = (_str: string) => {
    const dna = _str.split(":").shift();
    return dna;
  };

  const cleanName = (_str: string) => {
    const hasZ = zflag.test(_str);

    const zRemoved = _str.replace(zflag, "");

    const extension = /\.[0-9a-zA-Z]+$/;
    const hasExtension = extension.test(zRemoved);
    const nameWithoutExtension = hasExtension
      ? zRemoved.slice(0, -4)
      : zRemoved;
    const nameWithoutWeight = nameWithoutExtension
      .split(rarityDelimiter)
      .shift();
    return nameWithoutWeight;
  };

  const parseQueryString = (filename: string, layer: any, sublayer: any) => {
    const query = /\?(.*)\./;
    const querystring = query.exec(filename);
    if (!querystring) {
      return getElementOptions(layer, sublayer);
    }

    const layerstyles: any = querystring[1].split("&").reduce((r, setting) => {
      const keyPairs = setting.split("=");
      return { ...r, [keyPairs[0]]: keyPairs[1] };
    }, []);

    return {
      blendmode: layerstyles.blend
        ? layerstyles.blend
        : getElementOptions(layer, sublayer).blendmode,
      opacity: layerstyles.opacity
        ? layerstyles.opacity / 100
        : getElementOptions(layer, sublayer).opacity,
    };
  };

  /**
   * Given some input, creates a sha256 hash.
   * @param {Object} input
   */
  const hash = (input: any) => {
    // const hashable = typeof input === Buffer ? input : JSON.stringify(input);
    const hashable = JSON.stringify(input);
    return keccak256(hashable).toString("hex");
  };

  /**
   * Get't the layer options from the parent, or grandparent layer if
   * defined, otherwise, sets default options.
   *
   * @param {Object} layer the parent layer object
   * @param {String} sublayer Clean name of the current layer
   * @returns {blendmode, opaticty} options object
   */
  const getElementOptions = (
    layer: {
      sublayerOptions: { [x: string]: any };
      blend: string | undefined;
      opacity: number | undefined;
    },
    sublayer: string | number
  ) => {
    let blendmode = "source-over";
    let opacity = 1;
    if (layer.sublayerOptions?.[sublayer]) {
      const options = layer.sublayerOptions[sublayer];
      options.blend !== undefined ? (blendmode = options.blend) : null;
      options.opacity !== undefined ? (opacity = options.opacity) : null;
    } else {
      // inherit parent blend mode
      blendmode = layer.blend != undefined ? layer.blend : "source-over";
      opacity = layer.opacity != undefined ? layer.opacity : 1;
    }
    return { blendmode, opacity };
  };

  const parseZIndex = (str: any) => {
    const z = zflag.exec(str);
    return z ? parseInt(z[0].match(/-?\d+/)![0]) : null;
  };

  const getTraitValueFromPath = (
    element: {
      sublayer: any;
      weight: any;
      blendmode?: any;
      opacity?: number;
      id?: any;
      name: any;
      filename?: any;
      path?: string;
      zindex?: any;
    },
    lineage: string | any[]
  ) => {
    // If the element is a required png. then, the trait property = the parent path
    // if the element is a non-required png. black%50.png, then element.name is the value and the parent Dir is the prop
    if (element.weight !== "required") {
      return element.name;
    } else if (element.weight === "required") {
      // if the element is a png that is required, get the traitValue from the parent Dir
      return element.sublayer ? true : cleanName(lineage[lineage.length - 2]);
    }
  };

  const saveImage = (_editionCount: any) => {
    console.log("Saving image", _editionCount);
  };

  const genColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const pastel = `hsl(${hue}, 100%, ${background.brightness})`;
    return pastel;
  };

  const drawBackground = (canvasContext: {
    fillStyle: string;
    fillRect: (arg0: number, arg1: number, arg2: any, arg3: any) => void;
  }) => {
    canvasContext.fillStyle = genColor();
    canvasContext.fillRect(0, 0, format.width, format.height);
  };

  const addMetadata = (
    _dna: any,
    _edition: number,
    _prefixData: { _prefix: any; _offset: any; _imageHash: any }
  ) => {
    const dateTime = Date.now();
    const { _prefix, _offset, _imageHash } = _prefixData;

    const combinedAttrs = [...attributesList, ...extraAttributes()];
    const cleanedAttrs = combinedAttrs.reduce((acc, current) => {
      const x = acc.find(
        (item: { trait_type: any }) => item.trait_type === current.trait_type
      );
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

    const tempMetadata = {
      dna: hash(_dna),
      name: `${_prefix ? _prefix + " " : ""}#${_edition - _offset}`,
      description: description,
      image: `${baseUri}/${_edition}${outputJPEG ? ".jpg" : ".png"}`,
      ...(hashImages === true && { imageHash: _imageHash }),
      edition: _edition,
      date: dateTime,
      ...extraMetadata,
      attributes: cleanedAttrs,
      compiler: "Sailboat Labs NFT Generator",
    };
    metadataList.push(tempMetadata);
    attributesList = [];
    return tempMetadata;
  };

  const addAttributes = (_element: any) => {
    const selectedElement = _element.layer;
    const layerAttributes = {
      trait_type: _element.layer.trait,
      value: selectedElement.traitValue,
      ...(_element.layer.display_type !== undefined && {
        display_type: _element.layer.display_type,
      }),
    };
    if (
      attributesList.some(
        (attr: { trait_type: any }) =>
          attr.trait_type === layerAttributes.trait_type
      )
    )
      return;
    attributesList.push(layerAttributes);
  };

  const loadLayerImg = async (_layer: { path: any }) => {
    return new Promise(async (resolve) => {
      // selected elements is an array.
      const image = await loadImage(`${_layer.path}`).catch((err: any) =>
        console.log(`failed to load ${_layer.path}`, err)
      );
      resolve({ layer: _layer, loadedImage: image });
    });
  };

  const drawElement = (
    _renderObject: { loadedImage: any },
    mainCanvas: {
      drawImage: (
        arg0: any,
        arg1: number,
        arg2: number,
        arg3: any,
        arg4: any
      ) => void;
    }
  ) => {
    const layerCanvas = createCanvas(format.width, format.height);
    const layerctx = layerCanvas.getContext("2d");
    layerctx.imageSmoothingEnabled = format.smoothing;

    layerctx.drawImage(
      _renderObject.loadedImage,
      0,
      0,
      format.width,
      format.height
    );

    addAttributes(_renderObject);
    mainCanvas.drawImage(layerCanvas, 0, 0, format.width, format.height);
    return layerCanvas;
  };

  const constructLayerToDna = (_dna: any = [], _layers: any[] = []) => {
    const dna = _dna.split(DNA_DELIMITER);
    const mappedDnaToLayers = _layers.map((layer: any, index) => {
      const selectedElements: any[] = [];
      const layerImages = dna.filter(
        (element: string) => element.split(".")[0] == layer.id
      );
      layerImages.forEach((img: any) => {
        const indexAddress = cleanDna(img);

        //

        const indices = indexAddress!.toString().split(".");
        // const firstAddress = indices.shift();
        const lastAddress = indices.pop(); // 1
        // recursively go through each index to get the nested item
        const parentElement = indices.reduce((r: any, nestedIndex: any) => {
          if (!r[nestedIndex]) {
            throw new Error("wtf");
          }
          return r[nestedIndex].elements;
        }, _layers);

        selectedElements.push(parentElement[lastAddress!]);
      });
      // If there is more than one item whose root address indicies match the layer ID,
      // continue to loop through them an return an array of selectedElements

      return {
        name: layer.name,
        blendmode: layer.blendmode,
        opacity: layer.opacity,
        selectedElements: selectedElements,
        ...(layer.display_type !== undefined && {
          display_type: layer.display_type,
        }),
      };
    });
    return mappedDnaToLayers;
  };

  /**
   * In some cases a DNA string may contain optional query parameters for options
   * such as bypassing the DNA isUnique check, this function filters out those
   * items without modifying the stored DNA.
   *
   * @param {String} _dna New DNA string
   * @returns new DNA string with any items that should be filtered, removed.
   */
  const filterDNAOptions = (_dna: string) => {
    const filteredDNA = _dna.split(DNA_DELIMITER).filter((element: string) => {
      const query = /(\?.*$)/;
      const querystring = query.exec(element);
      if (!querystring) {
        return true;
      }
      const options: any = querystring[1].split("&").reduce((r, setting) => {
        const keyPairs = setting.split("=");
        return { ...r, [keyPairs[0]]: keyPairs[1] };
      }, []);

      return options.bypassDNA;
    });

    return filteredDNA.join(DNA_DELIMITER);
  };

  /**
   * Cleaning function for DNA strings. When DNA strings include an option, it
   * is added to the filename with a ?setting=value query string. It needs to be
   * removed to properly access the file name before Drawing.
   *
   * @param {String} _dna The entire newDNA string
   * @returns Cleaned DNA string without querystring parameters.
   */
  const removeQueryStrings = (_dna: string) => {
    const query = /(\?.*$)/;
    return _dna.replace(query, "");
  };

  const isDnaUnique = (_DnaList: any, _dna: any = []) => {
    return !dnaList.has(_dna);
  };

  // expecting to return an array of strings for each _layer_ that is picked,
  // should be a flattened list of all things that are picked randomly AND reqiured
  /**
   *
   * @param {Object} layer The main layer, defined in config.layerConfigurations
   * @param {Array} dnaSequence Strings of layer to object mappings to nesting structure
   * @param {Number*} parentId nested parentID, used during recursive calls for sublayers
   * @param {Array*} incompatibleDNA Used to store incompatible layer names while building DNA
   * @param {Array*} forcedDNA Used to store forced layer selection combinations names while building DNA
   * @param {Int} zIndex Used in the dna string to define a layers stacking order
   *  from the top down
   * @returns Array DNA sequence
   */
  function pickRandomElement(
    layer: any,
    dnaSequence: any[],
    parentId: string,
    incompatibleDNA: any[],
    forcedDNA: any[],
    bypassDNA: string,
    zIndex: any
  ): any {
    let totalWeight = 0;
    // Does this layer include a forcedDNA item? ya? just return it.
    const forcedPick = layer.elements.find((element: { name: any }) =>
      forcedDNA.includes(element.name)
    );
    if (forcedPick) {
      debugLogs ? console.log(`Force picking ${forcedPick.name}/n`) : null;
      const dnaString = `${parentId}.${forcedPick.id}:${forcedPick.zindex}${forcedPick.filename}${bypassDNA}`;
      return dnaSequence.push(dnaString);
    }

    if (incompatibleDNA.includes(layer.name) && layer.sublayer) {
      debugLogs
        ? console.log(
            `Skipping incompatible sublayer directory, ${layer.name}`,
            layer.name
          )
        : null;
      return dnaSequence;
    }

    const compatibleLayers = layer.elements.filter(
      (layer: { name: any }) => !incompatibleDNA.includes(layer.name)
    );
    if (compatibleLayers.length === 0) {
      debugLogs
        ? console.log(
            "No compatible layers in the directory, skipping",
            layer.name
          )
        : null;
      return dnaSequence;
    }

    compatibleLayers.forEach(
      (element: {
        weight: any;
        sublayer: any;
        id: any;
        zindex: any;
        filename: any;
      }) => {
        // If there is no weight, it's required, always include it
        // If directory has %, that is % chance to enter the dir
        if (element.weight == "required" && !element.sublayer) {
          const dnaString = `${parentId}.${element.id}:${element.zindex}${element.filename}${bypassDNA}`;
          dnaSequence.unshift(dnaString);
          return;
        }
        // when the current directory is a required folder
        // and the element in the loop is another folder
        if (element.weight == "required" && element.sublayer) {
          const next = pickRandomElement(
            element,
            dnaSequence,
            `${parentId}.${element.id}`,
            incompatibleDNA,
            forcedDNA,
            bypassDNA,
            zIndex
          );
        }
        if (element.weight !== "required") {
          totalWeight += element.weight;
        }
      }
    );
    // if the entire directory should be ignored…

    // number between 0 - totalWeight
    const currentLayers = compatibleLayers.filter(
      (l: { weight: string }) => l.weight !== "required"
    );

    let random = Math.floor(Math.random() * totalWeight);

    for (let i = 0; i < currentLayers.length; i++) {
      // subtract the current weight from the random weight until we reach a sub zero value.
      // Check if the picked image is in the incompatible list
      random -= currentLayers[i].weight;

      // e.g., directory, or, all files within a directory
      if (random < 0) {
        // Check for incompatible layer configurations and only add incompatibilities IF
        // chosing _this_ layer.
        if (incompatible[currentLayers[i].name]) {
          debugLogs
            ? console.log(
                `Adding the following to incompatible list`,
                ...incompatible[currentLayers[i].name]
              )
            : null;
          incompatibleDNA.push(...incompatible[currentLayers[i].name]);
        }
        // Similar to incompaticle, check for forced combos
        if (forcedCombinations[currentLayers[i].name]) {
          debugLogs
            ? console.log(
                chalk.bgYellowBright.black(
                  `\nSetting up the folling forced combinations for ${currentLayers[i].name}: `,
                  ...forcedCombinations[currentLayers[i].name]
                )
              )
            : null;
          forcedDNA.push(...forcedCombinations[currentLayers[i].name]);
        }
        // if there's a sublayer, we need to concat the sublayers parent ID to the DNA srting
        // and recursively pick nested required and random elements
        if (currentLayers[i].sublayer) {
          return dnaSequence.concat(
            pickRandomElement(
              currentLayers[i],
              dnaSequence,
              `${parentId}.${currentLayers[i].id}`,
              incompatibleDNA,
              forcedDNA,
              bypassDNA,
              zIndex
            )
          );
        }

        // none/empty layer handler
        if (currentLayers[i].name === emptyLayerName) {
          return dnaSequence;
        }
        const dnaString = `${parentId}.${currentLayers[i].id}:${currentLayers[i].zindex}${currentLayers[i].filename}${bypassDNA}`;
        return dnaSequence.push(dnaString);
      }
    }
  }

  /**
   * given the nesting structure is complicated and messy, the most reliable way to sort
   * is based on the number of nested indecies.
   * This sorts layers stacking the most deeply nested grandchildren above their
   * immediate ancestors
   * @param {[String]} layers array of dna string sequences
   */
  const sortLayers = (layers: any[]) => {
    const nestedsort = layers.sort((a: string, b: string) => {
      const addressA = a.split(":")[0];
      const addressB = b.split(":")[0];
      return addressA.length - addressB.length;
    });

    let stack = { front: [], normal: [], end: [] };
    stack = nestedsort.reduce(
      (acc: { normal: any; front: any; end: any }, layer: any) => {
        const zindex = parseZIndex(layer);
        if (!zindex)
          return { ...acc, normal: [...(acc.normal ? acc.normal : []), layer] };
        // move negative z into `front`
        if (zindex < 0)
          return { ...acc, front: [...(acc.front ? acc.front : []), layer] };
        // move positive z into `end`
        if (zindex > 0)
          return { ...acc, end: [...(acc.end ? acc.end : []), layer] };
        // make sure front and end are sorted
        // contat everything back to an ordered array
      },
      stack
    );

    return sortByZ(stack.front).concat(stack.normal).concat(sortByZ(stack.end));
  };

  /** File String sort by zFlag */
  function sortByZ(dnastrings: any[]) {
    return dnastrings.sort((a: any, b: any) => {
      const indexA = parseZIndex(a);
      const indexB = parseZIndex(b);

      return indexA ?? 0 - indexB!;
    });
  }

  /**
   * Sorting by index based on the layer.z property
   * @param {Array } layers selected Image layer objects array
   */
  function sortZIndex(layers: any[]) {
    return layers.sort((a: { zindex: any }, b: { zindex: any }) => {
      const indexA = parseZIndex(a.zindex);
      const indexB = parseZIndex(b.zindex);
      return indexA ?? 0 - indexB!;
    });
  }

  const createDna = (_layers: any[]) => {
    let dnaSequence: any[] = [];
    const incompatibleDNA: never[] = [];
    const forcedDNA: never[] = [];

    _layers.forEach((layer: any) => {
      const layerSequence: never[] = [];
      pickRandomElement(
        layer,
        layerSequence,
        layer.id,
        incompatibleDNA,
        forcedDNA,
        layer.bypassDNA ? "?bypassDNA=true" : "",
        layer.zindex ? layer.zIndex : ""
      );
      const sortedLayers = sortLayers(layerSequence);
      dnaSequence = [...dnaSequence, [sortedLayers]];
    });
    const zSortDNA = sortByZ(dnaSequence.flat(2));
    const dnaStrand = zSortDNA.join(DNA_DELIMITER);
    return dnaStrand;
  };

  const writeMetaData = (_data: string) => {
    console.log("write metadata");

    // fs.writeFileSync(`${buildDir}/json/_metadata.json`, _data);
  };

  const writeDnaLog = (_data: string) => {
    // fs.writeFileSync(`${buildDir}/_dna.json`, _data);
    console.log("write dna");
  };

  const saveMetaDataSingleFile = (_editionCount: any) => {
    const metadata = metadataList.find(
      (meta: { edition: any }) => meta.edition == _editionCount
    );
    debugLogs
      ? console.log(
          `Writing metadata for ${_editionCount}: ${JSON.stringify(metadata)}`
        )
      : null;
    console.log("write single metadata");

    // fs.writeFileSync(
    //   `${buildDir}/json/${_editionCount}.json`,
    //   JSON.stringify(metadata, null, 2)
    // );
  };

  function shuffle(array: any[]) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  /**
   * Paints the given renderOjects to the main canvas context.
   *
   * @param {Array} renderObjectArray Array of render elements to draw to canvas
   * @param {Object} layerData data passed from the current iteration of the loop or configured dna-set
   *
   */
  const paintLayers = (
    canvasContext: any,
    renderObjectArray: any[],
    layerData: any,
    passedAbstractedIndexes: any
  ) => {
    debugLogs ? console.log("\nClearing canvas") : null;
    canvasContext.clearRect(0, 0, format.width, format.height);

    const { abstractedIndexes, _background } = layerData;

    renderObjectArray.forEach(async (renderObject: any) => {
      // one main canvas
      // each render Object should be a solo canvas
      // append them all to main canbas
      canvasContext.globalAlpha = renderObject.layer.opacity;
      canvasContext.globalCompositeOperation = renderObject.layer.blendmode;
      canvasContext.drawImage(
        drawElement(renderObject, canvasContext),
        0,
        0,
        format.weight,
        format.height
      );
    });
    const image = canvas.toDataURL();
    outputFiles(abstractedIndexes, layerData, image);

    // dispatch(addGeneratedImage(image));
    // setImages([...images, image]);
    // imagesList = images;
    // imagesList.push(image);
    // setImages(imagesList);

    if (_background.generate) {
      canvasContext.globalCompositeOperation = "destination-over";
      drawBackground(canvasContext);
    }
    debugLogs
      ? console.log("Editions left to create: ", abstractedIndexes)
      : null;
  };

  const postProcessMetadata = (layerData: {
    abstractedIndexes: any;
    layerConfigIndex: any;
  }) => {
    const { abstractedIndexes, layerConfigIndex } = layerData;
    // Metadata options
    // const savedFile = fs.readFileSync(
    //   `${buildDir}/images/${abstractedIndexes[0]}${
    //     outputJPEG ? ".jpg" : ".png"
    //   }`
    // );
    // const _imageHash = hash(savedFile);
    const _imageHash = "hash(savedFile);";

    // if there's a prefix for the current configIndex, then
    // start count back at 1 for the name, only.
    const _prefix = layerConfigurations[layerConfigIndex].namePrefix
      ? layerConfigurations[layerConfigIndex].namePrefix
      : null;
    // if resetNameIndex is turned on, calculate the offset and send it
    // with the prefix
    let _offset = 0;
    if (layerConfigurations[layerConfigIndex].resetNameIndex) {
      _offset = layerConfigurations[layerConfigIndex - 1].growEditionSizeTo;
    }

    return {
      _imageHash,
      _prefix,
      _offset,
    };
  };

  const outputFiles = (
    abstractedIndexes: any[],
    layerData: any,
    image: any
  ) => {
    const { newDna, layerConfigIndex } = layerData;
    // Save the canvas buffer to file

    const { _imageHash, _prefix, _offset } = postProcessMetadata(layerData);

    addMetadata(newDna, abstractedIndexes[0], {
      _prefix,
      _offset,
      _imageHash,
    });

    const generatedToken: IGeneratedTokens = {
      createdOn: new Date().toISOString(),
      file: image,
      edition: abstractedIndexes[0],
      metadata: metadataList.find(
        (meta: { edition: any }) => meta.edition == abstractedIndexes[0]
      ),
    };

    // dispatch(addGeneratedImage(generatedToken));

    dispatch(addGeneratedImage(generatedToken));

    console.log(
      chalk.cyan(
        `Created edition: ${abstractedIndexes[0]}, with DNA: ${hash(newDna)}`
      )
    );
  };

  const startCreating = async () => {
    const storedDNA = null;
    try {
      console.log("Generating");
      // if (storedDNA) {
      //   console.log(`using stored dna of ${storedDNA.size}`);
      //   dnaList = storedDNA;
      // }
      let layerConfigIndex = 0;
      let editionCount = 1; //used for the growEditionSize while loop, not edition number
      let failedCount = 0;
      let abstractedIndexes: any[] = [];
      for (
        let i = startIndex;
        i <=
        startIndex +
          layerConfigurations[layerConfigurations.length - 1].growEditionSizeTo;
        i++
      ) {
        abstractedIndexes.push(i);
      }
      if (shuffleLayerConfigurations) {
        abstractedIndexes = shuffle(abstractedIndexes);
      }
      debugLogs
        ? console.log("Editions left to create: ", abstractedIndexes)
        : null;
      while (layerConfigIndex < layerConfigurations.length) {
        // const layers = layersSetup(
        //   layerConfigurations[layerConfigIndex].layersOrder
        // );

        // return console.log("using data", JSON.stringify(layers));

        while (
          editionCount <=
          layerConfigurations[layerConfigIndex].growEditionSizeTo
        ) {
          const newDna = createDna(layers);
          if (isDnaUnique(dnaList, newDna)) {
            const results = constructLayerToDna(newDna, layers);
            debugLogs
              ? console.log("Creating with DNA:", newDna.split(DNA_DELIMITER))
              : null;
            const loadedElements: any[] = [];
            // reduce the stacked and nested layer into a single array
            const allImages = results.reduce((images: any, layer) => {
              return [...images, ...layer.selectedElements];
            }, []);
            sortZIndex(allImages).forEach((layer: any) => {
              loadedElements.push(loadLayerImg(layer));
            });

            await Promise.all(loadedElements).then((renderObjectArray) => {
              const layerData = {
                newDna,
                layerConfigIndex,
                abstractedIndexes,
                _background: background,
              };
              paintLayers(
                ctxMain,
                renderObjectArray,
                layerData,
                abstractedIndexes
              );
            });

            dnaList.add(filterDNAOptions(newDna));
            editionCount++;
            abstractedIndexes.shift();
          } else {
            console.log(chalk.bgRed("DNA exists!"));
            failedCount++;
            if (failedCount >= uniqueDnaTorrance) {
              console.log(
                `You need more layers or elements to grow your edition to ${layerConfigurations[layerConfigIndex].growEditionSizeTo} artworks!`
              );
              // eslint-disable-next-line no-process-exit
              // process.exit();
              throw `You need more layers or elements to grow your edition`;
            }
          }
        }
        layerConfigIndex++;
      }
      writeMetaData(JSON.stringify(metadataList, null, 2));
      // writeDnaLog(JSON.stringify([...dnaList], null, 2));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div
        onClick={() => {
          dispatch(clearGeneratedImages({}));

          startCreating();
        }}
        className="gradient-button mt-10"
      >
        Generate Tokens
      </div>
      <div
        onClick={() => {
<<<<<<< HEAD
=======
          // router.push("/nft/generate");
>>>>>>> main
          openModal();
        }}
        className="gradient-button mt-10"
      >
        View Generated Tokens
      </div>
<<<<<<< HEAD
=======
      <div
        onClick={() => {
          dispatch(clearGeneratedImages({}));
        }}
        className="gradient-button mt-10"
      >
        Clear Generated Tokens
      </div>
>>>>>>> main

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            //
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="min-h-screen w-screen transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <div className="mb-5 flex w-full items-center justify-between">
                      <div className="flex items-center gap-5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-10 w-10"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                          />
                        </svg>
                        <span className="text-3xl">Generated Images</span>
                      </div>
                      <svg
                        onClick={() => {
                          closeModal();
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 cursor-pointer rounded-xl bg-gray-200 p-2 transition-all hover:scale-105 hover:bg-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                    {generatedTokens?.length} tokens
                  </Dialog.Title>
                  <div className="flex w-full items-start">
                    <div className="mt-5 grid w-1/2 grid-cols-4">
                      {generatedTokens.map((token, index) => (
                        <div
                          onClick={() => {
                            setSelectedToken(token);
                          }}
                          key={index}
                          className="flex flex-col gap-1"
                        >
                          <img
                            src={token.file}
                            alt=""
                            className="h-52 w-52 cursor-pointer rounded-lg object-cover transition-all hover:scale-105"
                          />
                          <div className="text-sm text-gray-700">
                            Nozomix #{token.edition}
                          </div>
                        </div>
                      ))}
                    </div>
                    <table>
                      <tr>
                        <td>Edition</td>
                        <td>{selectedToken?.edition}</td>
                      </tr>
                    </table>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
