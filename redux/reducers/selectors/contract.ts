/**
 * returns contract information;
 *
 * @param state - redux state object
 * @returns {Object} - contract information
 */
export const getContract = (state: any) => state.contractReducer;

/**
 * returns activeStep
 *
 * @param state - redux state object
 * @returns {Number} - activeStep
 */
export const getActiveStep = (state: any) => state.contractReducer.activeStep;

/**
 * gets contract information by field name
 *
 * @param state - redux state object
 * @returns {Object} - contract information
 */
export const getContractByField = (fieldName: string) => (state: any) =>
  state.contractReducer[fieldName];
