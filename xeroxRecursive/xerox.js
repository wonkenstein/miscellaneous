
const productData = getData()
console.log('productData', productData)
console.log('======')

const productCategories = findProduct(productData, 'phaser 1234', [])
console.log('productCategories:', productCategories)
console.log('======')

const productCategories2 = findProduct2(productData, 'phaser 1234')
console.log('productCategories2:', productCategories2)
console.log('======')

const flattenedCategories = flattenArray(productCategories2, [])
console.log('flattened:', flattenedCategories)


function findProduct(items, productToFind, categories) {
  items.map(item => {
    if (item.products) {
      // check for product in array
      if (item.products.indexOf(productToFind) > -1) {
        categories.push(item.id)
      }
    }
    else if (item.sub_categories) {
      // recursion
      return findProduct(item.sub_categories, productToFind, categories)
    }
  })

  return categories
}

function findProduct2(items, productToFind) {
  return items.map(item => {
    if (item.products) {
      if (item.products.indexOf(productToFind) > -1) {
        return item.id
      }
    }
    else if (item.sub_categories) {
      return findProduct2(item.sub_categories, productToFind)
    }
  })
}

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
      id: 'item1',
      sub_categories: [
        {
          id: 'item1.1',
          products: [
            'some product',
            'phaser 1234'
          ]
        },
        {
          id: 'item1.2',
          products: [
            'some product',
            'phaser 1234'
          ]
        },
        {
          id: 'item1.3',
          sub_categories: [
            {
              id: 'item1.3.1',
              products: [
                'some product',
                // 'phaser 1234'
              ]
            },
            {
              id: 'item1.3.2',
              products: [
                'some product',
                'phaser 1234'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'item2',
      sub_categories: [
        {
          id: 'item2.1',
          products: [
            'some product',
            'phaser 1234'
          ]
        },
        {
          id: 'item2.2',
          products: [
            'some product',
            'booboo'
          ]
        },
        {
          id: 'item2.3',
          sub_categories: [
            {
              id: 'item2.3.1',
              products: [
                'some product',
                'phaser 1234'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'item3',
      products: [
        'some product',
        'phaser 1234'
      ]
    }
  ]
}
