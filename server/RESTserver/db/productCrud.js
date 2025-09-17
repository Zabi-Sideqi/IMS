const productModel = require('./models/product')

const createProduct = async (productData) => {
  try {
    console.log('Skapar produkt med data:', productData)
    const existingProduct = await productModel.findOne({
      $or: [{ name: productData.name }, { sku: productData.sku }],
    })
    console.log('Resultat av findOne:', existingProduct)

    if (existingProduct) {
      throw new Error(
        'Product with the same name or SKU already exists, please try again.'
      )
    }

    const product = new productModel(productData)
    return product.save()
  } catch (error) {
    throw new Error(`${error.message}`)
  }
}

const findProducts = async (filter = {}, options = {}) => {
  const { page = 1, limit = 10 } = options
  const offset = (page - 1) * limit
  return productModel.find(filter).skip(offset).limit(limit)
}

const findProductById = async (id) => {
  return productModel.findById(id)
}

const updateProduct = async (id, productData) => {
  return productModel.findByIdAndUpdate(id, productData, { new: true })
}

const deleteProduct = async (id) => {
  return productModel.findByIdAndDelete(id)
}

const deleteAllProducts = async () => {
  return productModel.deleteMany({})
}

// Get products with low stock (less than 30 units)
const getLowStockProducts = async () => {
  try {
    const lowStockProducts = await productModel.find({
      amountInStock: { $lt: 30 },
    })
    return lowStockProducts
  } catch (error) {
    throw new Error(`Failed to retrieve low stock products: ${error.message}`)
  }
}

// Get products with critical stock (less than 5 units)
const getCriticalStockProducts = async () => {
  try {
    const criticalStockProducts = await productModel
      .find({
        amountInStock: { $lt: 5 },
      })
      .select(
        'manufacturer contact.name contact.phone contact.email amountInStock'
      )
    return criticalStockProducts
  } catch (error) {
    throw new Error(
      `Failed to retrieve critical stock products: ${error.message}`
    )
  }
}

// Get total stock value of all products
const getTotalStockValue = async () => {
  try {
    const products = await findProducts()
    return products.reduce(
      (total, product) => total + product.price * product.amountInStock,
      0
    )
  } catch (error) {
    throw new Error(`Failed to get total stock value: ${error.message}`)
  }
}

// Get a list of all manufacturers
const getManufacturers = async () => {
  try {
    const manufacturers = await productModel.distinct('manufacturer')
    return manufacturers
  } catch (error) {
    throw new Error(`Failed to get manufacturers: ${error.message}`)
  }
}

// Get total stock value by manufacturer name
const getTotalStockValueByManufacturer = async () => {
  try {
    const stockValueByManufacturer = await productModel.aggregate([
      {
        $group: {
          _id: '$manufacturer.name',
          totalStockValue: {
            $sum: { $multiply: ['$price', '$amountInStock'] },
          },
        },
      },
    ])
    return stockValueByManufacturer
  } catch (error) {
    throw new Error(
      `Failed to calculate total stock value by manufacturer: ${error.message}`
    )
  }
}

module.exports = {
  createProduct,
  findProducts,
  findProductById,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
  getLowStockProducts,
  getCriticalStockProducts,
  getTotalStockValue,
  getManufacturers,
  getTotalStockValueByManufacturer,
}
