const icons = [
  {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAACY0lEQVRIie2WO2tUURDHf2tETCWWbnYXSYoYjaT3I8RXPocxWbWJiKUhbcBCg1qIaGF8EHBjIYgYq6RKExNUEBRRiUg2WIRkWYuZwz0799zHrq/GgeHeO/Of+Z+Z87rwX/6SFNrAVoDTwHHgIFBS+0fgPfAEmAM+/K7B9QAzwA7QzNAGcF8H9ksyAmya5E+BIaBbdUhtPqYOnOqUtIpUYKuqBLCVAK4BjLdLOpJA2gSKAXxPArZBG5WXiLfX14lAzMUUfD1hsDG5pQHrwE1g0STaUvKi6oTafMyixq7r940s0gqyereAQbUVgMspFVm9RLRNj2quHaLtF5QxDb5r7AVgNQfpCvGz4Z76Rn3jLgMa1uecsTeB5bQRqywr1heXa9g3WuJefb419gIw4H3XkNaVkT3s5Ajxit/psy9txHUd8VljP09rS/35Khtf1cRWiVZ3JnEDmAWmgOfE5zKNuKkxU5rDnQepxGuBJCGdp7XVeWJW04jzJulEaz5RlyHej1l9wA/gDnLtdRE+qwEWgNvIwuwH9hj/NLCUVHGZ1uvvO3DIYCYD1VwxmAGNdf5tMg4QkKPOBUwH/LuBzx7mE/HOAVz1MDNZpCA3jVvdDxMwL72kLxIwj9W/ARzIQwxylbltcM749gJfPeIvavPlAtG2PKm2Y3nJxz3yB8i8dQPXic/xNfUdRrrkSMc01z7gTV5ikMpd29vRDeCEl+cZ8TM8U4rIfZrnZ28bWUh2Tt3gM1d2SErI1TYPvEb+Ujb1vQacSUn8iOjEK3dC3qn0A9+IOvPKXot/StaQ3+BZorb/G/kJo6MuhQ9l+08AAAAASUVORK5CYII=",
  },
  {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAEhElEQVRoge2XTYgcVRSFv/u6qnqiCUZdiJtAQCIxaEAX/oAYcKFGnTYDKtGNoqCG4DpIFoEIceVKkUgWwYXgRJPuiIgLFQkuNAYN/hBdGCIGEVEnkZB0V/U7LqqquzPTP9Uz3TMKfRbdVbeq7j2n3r333YIJJpjgfw1bqcCaJWI1xiqM84RW4Z/F+FlWATrC2kTBZpztBa6VbB2ojOMi8HPT+xMl3GvRtviboj6XTUBSjR4Xeh7YktuUEfBYdgYYFwPTy+7hZJ9ZbuyNZREQV4OXvNkuPGsEWBbVkdJWpsRZdgw40wclku2DUsuNkzhAUg1fR7bbxBozWuxNoNSAWWaWshUBL3swIXgnM62MgHotetTDDhmrUotwiJYQqUUagUhzJicl7AFfDXb1izFWAeZ1V+d5StDAC1CawDn7zvs6LjWd7a4fjjb2ijE2AZqlBDzduf7psVpvOn3r6RVZesXTrgV58OIK8NPLLiCeCp/FuErzMjjPHpcJIGs1JjAMR1oD+RKUAJzN9IozvhSS22hZRXotbHfKlJil6ZQnUf6f1rTwGCV0g2ZZ3S3M2AQ4+aDdHrWwoec55NPayJpQ2pHIbM4whMet5m/qyybg4tGp9d64s22xdqp0uT9PK+vYz9riAKnB1d3b6VgEuKZ/ErEp452WrBeub0fvXCXDk6aZGZjjTM9Yo6Od0diDM6ddQBnlO2vWZfKu00WIZFndpgVTyldD4GVn7TEayyKgfkt5J+LKy8iRtcbc4HP75UqUUTI8krXYOe/39oo3UgGa5RpX8q92vab2PkCaFsyf1QyQCS9DEpZ2sI8DS77rFXOkAhrl8BOUtu5eaCWKbw916tTR2XLNzpmz/baNuV7+Ribg0uHyiyY2D7pPHb8+b6UL1gIc1IV/pVxpHOrnbyTjdP1otMmkbxckdT907liwoMU6442gEu8Y5GbJAvQpU/Fc+BetibM4PFmbzL9lpHM4DnjcF9F0490iHzTB0IznIT4XnsjJ99qousK4VIIfzDieeHchcP5UqZIcKEK6E0sSkNTCt724qc1pANoK5yzRviQMDq2avnR6KRwWLaBRC3d6sX2oh4wGxgvh1/FB24OHZLHhO1wuAvFscL+P7MN+D1+WTmlSfBkq3moz/LmYmL0wtIB6NbrZ0MnWCDkY3jmeCabjg0OzK4ChBOg9ro9d+Gv23VHE+VzTu9unZuo/LY5eoRjFoBprEoI/JCsX8+w+D8P6vba1+xw/KhQqYu0nbBL+IlGIvBNvBo/Un1satWIYKEB7cMl1wWmJtQX8Cc9TwUz81gi4FULfwUvC4vPRKWD9IEcG3gJtiSrJ+yNjVwB9VyA+Gn2FtGGQE2dqNEvutvJDcc+xd1zoKSCuBZ9JunWQAzPOly4kG4In+H201Iqh9wrI7h70sDmdDcrJjVbhwkhZDYGe/VzeHRvw7PfBb8l6u2/lyMOAfaBRi84grZtvlzgenYzvSOeZlcXAjaxZDX9sQmchHwsr8T3Djr0rino1+qhxJPT1WnB4pblMMMEEE/y38C/ikLUmjSQDNAAAAABJRU5ErkJggg==",
  },
  {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAADZklEQVR4nO3aT4scRRjH8c9ko0FNzBIFMXpQj6IBRa8KEX0BvgA9iJfgIQc968UYjMaYzeIaY0jwLxgE0UMUT+JBE1bxoHg3iUYwEfUkbiaHZ5rpnu2ennV3e7Z65gfFLl3F8Hyfeup5urqKqaaaquXqYNu4jRiXOjiMH3DzmG1pXBl8t9dKnbCpYaOaUkewbck924UvcWN+4OYGjWpK2czfgKfxH/b0+s7g7zHZ1Yg6mNMP++OYwTyO9vpbrW1Y1HdAF28LJ5TCtyUHdHAIj+MRnM31LeGKcEYrlQ/7JTyJWbHeJyLs78Rl/ZBfwhPYagT4lJdABy+KbP8o/uw934QH8I8JCfvfcS/uwx8mJOwf1k9sXVzEPbhDS+CrlmYHe0W526PohH3NmLb+yjL4nOJsdnBEwH6t6IR5LZn5DD6b1cwJefisZU54SEvh807YjHdK+vaOxdJ10HZ8azlg1t4UTjiZe7Ym2X4j7AZn8QUeHDLmcu/vUyJB/oVntKDOV4V9vu3HNfhYLIfKjU1qqgv7Ll4RUfqB4nJI3gGjwL9qOfyarv9xaZSwPyDC/tSQMXNNG74WWgn8RzXjzkhsMzdK2B8UYf9+zbhF7GjW/NVpJfDv1YxrJfxrpvCTCz+Dd2vGJQefz/anxFebQahDYuY/LOkbzPazzZq/OuXhXxDHU98rQr2u+iUnafjt+EYY/zyuxSeKUAuqt7etCftFAf+pItRho9X55GY+D39JfKYaXPfZh426bJ80/II4fl5ShDoi4OuyfdLwXbH+v1IOX7fmk4Y/KE5hB6HmTQB8Vuo+NyHw+VK3X3mpO2r5R8xWlLpR4N8yhXfCFH6y4I+JXd2ClsHns/1LItt/ZnnCmxE3slqV7QdfcvbhtHL4sneApOHzYV/Vsutnb9SMSzrsB9uvAuiAlsx82enKs7gNv+ACzvXaBfybG/cynhvy22fxmP7lpQ2pMgdch1txF3aW/H897haRcH/F734nbm5dWmN7111b8bPhYf1jb+xvFf0bPuzrdIuArHLAaVEOr5T0JZfwqjTMCcfE7cxWwFcdLl7EbvxU0ncOtw88S3bNDztdrXLCeUUHJAtP/fFymRPOizJJ4vArUT4n7BJHWkmu+dVopyiRN4mXpaRL3f/VSHfwp5pqqmR0FQqIVbj9IqNGAAAAAElFTkSuQmCC",
  },
];

export default icons