
const productData = getData()
const productToFind = 'PHASER_1234'
console.log('productData:', productData)
console.log('productToFind:', productToFind)
console.log('======')

const productCategories = findProductCategories(productData, productToFind, [])
console.log('productCategories:', productCategories)

// with breadcrumbs for categories
const productCategoriesBreadcrumb = findProductCategoriesBreadcrumb(productData, productToFind, [])
console.log('productCategoriesBreadcrumb:', productCategoriesBreadcrumb)
console.log('======')


const productCategoriesAlt = findProductCategoriesAlternative(productData, productToFind)
console.log('productCategoriesAlt:', productCategoriesAlt)
const flattenedCategories = flattenArray(productCategoriesAlt, [])
console.log('flattenedCategories:', flattenedCategories)
console.log('======')

const f = flattenArray(findProductCategoriesAlternative(productData, productToFind), [])
console.log('f:', f)


// return array of categories that productToFind appears in
function findProductCategories(items, productToFind, categories) {
  items.map(item => {
    if (item.products) {
      // check for product in array
      if (item.products.indexOf(productToFind) > -1) {
        categories.push(item.id)
      }
    }

    if (item.sub_categories) {
      // recursion
      return findProductCategories(item.sub_categories, productToFind, categories)
    }
  })

  return categories
}

// return array of categories breadcrumb that productToFind appears in
function findProductCategoriesBreadcrumb(items, productToFind, categories, trail='') {
  const seperator = '--'
  items.map(item => {
    let breadcrumb = trail + item.id
    if (item.products) {
      // check for product in array
      if (item.products.indexOf(productToFind) > -1) {
        categories.push(trail + item.id + '')
      }
    }

    if (item.sub_categories) {
      // recursion
      breadcrumb += seperator
      return findProductCategoriesBreadcrumb(item.sub_categories, productToFind, categories, breadcrumb)
    }
  })

  return categories
}

// return array with category if productToFind is in that node, undefined if not,
// array structure mimics the items passed in
function findProductCategoriesAlternative(items, productToFind) {
  return items.map(item => {
    if (item.products) {
      if (item.products.indexOf(productToFind) > -1) {
        return item.id
      }
    }

    if (item.sub_categories) {
      return findProductCategoriesAlternative(item.sub_categories, productToFind)
    }
  })
}

// flatten the array returned by findProductCategoriesAlternative so we get an array of the id's
function flattenArray(data, flattened) {
  data.map(item => {
    if (Array.isArray(item)) {
      // recursively add array to our flattened array
      flattened.concat(flattenArray(item, flattened))
    }
    else if (item !== undefined) {
      flattened.push(item)
    }
  })

  return flattened
}


function getData() {
  return [
    {
      "id": "DIGITAL_PRESSES",
      "sub_categories": [
        {
          "id": "BW_PRODUCTION",
          "sub_categories": [],
          "products": [
            "D136"
          ]
        },
        {
          "id": "COLOR_PRODUCTION",
          "sub_categories": [],
          "products": [
            "800_1000_DCP",
            "C60_C70_DCP"
          ]
        },
        {
          "id": "BW_TRANSACTIONAL",
          "sub_categories": [],
          "products": [
            "NV_200_288_MX",
            "NV_144MX",
            "DT_120MX"
          ]
        }
      ],
      "products": []
    },
    {
      "id": "PRINT",
      "sub_categories": [
        {
          "id": "PRINT_COLOR",
          "sub_categories": [
            {
              "id": "PRINT_COLOR_LETTER",
              "products": [
                "PHASER_6510",
                "PHASER_1234",
                "VERSALINK_C400"
              ]
            },
            {
              "id": "PRINT_COLOR_TABLOID",
              "products": [
                "VERSALINK_C7000"
              ]
            }
          ]
        },
        {
          "id": "PRINT_BW",
          "sub_categories": [
            {
              "id": "PRINT_BW_LETTER",
              "products": [
                "PHASER_3260",
                "PHASER_3610"
              ]
            },
            {
              "id": "PRINT_BW_TABLOID",
              "products": [
                "PHASER_5550"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ALL_DESKTOP",
      "products": [
        "PHASER_6510",
        "PHASER_1234",
        "VERSALINK_C400",
        "PHASER_3260",
        "PHASER_3610"
      ]
    }
  ]
}
