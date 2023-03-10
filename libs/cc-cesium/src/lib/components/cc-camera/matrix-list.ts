interface MatrixList {
  "4/3": MatrixTypes
  "16/9": MatrixTypes
}

type MatrixTypes = {[key: string]: MatrixParams}

interface MatrixParams {
  name: string
  width: string
  height: string
}

export const MATRIX_LIST: MatrixList = {
  "4/3": {
    "m14": {
      "name": "1/4\"",
      "width": "3.6",
      "height": "2.7"
    },
    "m132": {
      "name": "1/3,2\"",
      "width": "4.5",
      "height": "3.4"
    },
    "m13": {
      "name": "1/3\"",
      "width": "4.8",
      "height": "3.6"
    },
    "m129": {
      "name": "1/2,9\"",
      "width": "4.9",
      "height": "3.7"
    },
    "m128": {
      "name": "1/2,8\"",
      "width": "4.8",
      "height": "3.6"
    },
    "m127": {
      "name": "1/2,7\"",
      "width": "5.4",
      "height": "4"
    },
    "m125": {
      "name": "1/2,5\"",
      "width": "5.8",
      "height": "4.3"
    },
    "m123": {
      "name": "1/2,3\"",
      "width": "6.2",
      "height": "4.6"
    },
    "m12": {
      "name": "1/2\"",
      "width": "6.4",
      "height": "4.8"
    }
  },
  "16/9": {
    "m14": {
      "name": "1/4\"",
      "width": "3.9",
      "height": "2.2"
    },
    "m132": {
      "name": "1/3,2\"",
      "width": "4.9",
      "height": "2.7"
    },
    "m13": {
      "name": "1/3\"",
      "width": "5.2",
      "height": "2.9"
    },
    "m129": {
      "name": "1/2,9\"",
      "width": "5.4",
      "height": "2.96"
    },
    "m128": {
      "name": "1/2,8\"",
      "width": "5.27",
      "height": "3",
    },
    "m127": {
      "name": "1/2,7\"",
      "width": "5.47",
      "height": "3.07"
    },
    "m125": {
      "name": "1/2,5\"",
      "width": "5.9",
      "height": "3.32"
    },
    "m123": {
      "name": "1/2,3\"",
      "width": "0",
      "height": "0"
    },
    "m12": {
      "name": "1/2\"",
      "width": "7.38",
      "height": "4.15"
    }
  }
}
