const Product = require("../models/Product")
const Category = require("../models/Category")



class Products {
    async getProduct(req, res) {
      try {
        const product = await Product.findById(req.params.id)
        return res.json(product)
      } catch( e ) {
        return res.status(404).json('product not found')
      }
    }

    async uploadProductImage(req, res) {

      if (!req.file) return res.status(400).json({ message: 'Ошибка загрузки' });

      const imageUrl = req.file.path // Cloudinary возвращает URL загруженного файла

      try {
        const product = await Product.findById(req.body.productId)
        if ( !product ) {
          return res.status(404).json('product not found')
        }
        await Product.updateOne(product, { img: imageUrl } )
        res.json({ imageUrl: req.file.path });
      } catch( e ) {
        return res.status(404).json('product not found')
      }
     
    }

    async deleteProductImage(req, res) {
      try {
        const product = await Product.findById(req.body.productId)
        if ( !product ) {
          return res.status(404).json('product not found')
        }
        await Product.updateOne(product, { img: '' } )
        product.img = ""
        return res.json(product);
      } catch( e ) {
        return res.status(404).json('product not found')
      }
    }

    async updateProduct(req, res) {
      try{ 
        const product = await Product.findById(req.body.id)

        if ( !product ) {
          return res.status(404).json('product not found')
        }

        const { category, description, name, price, slug, image, isNewProduct, isPopular } = req.body
        
        await Product.updateOne(product, { category, description, name, price, slug, isNewProduct, isPopular } )

        return res.json(product)
      } catch( e ) {
        return res.status(404).json('product not found')
      }
    }
    async getProducts(req, res) {
      try {
        const name = req.query.name.trim() || ""
        const page = parseInt(req.query.page) || 1;
        const limit = 10
        const products = await Product.find({'name': { $regex: name }}).sort({date_create:'desc'}).skip( (page - 1) * limit ).limit(limit)
        const total = await Product.countDocuments({'name': { $regex: name }})
        const productsDto = []
        
        for (let product of products) {
            const category = await Category.findById(product.category)
            let productDto = {}
            productDto._id = product._id   
            productDto.name = product.name
            productDto.slug = product.slug
            productDto.price = product.price
            productDto.isPopular = product.isPopular
            productDto.isNewProduct = product.isNewProduct
            productDto.img = product.img
            productDto.description = product.description
            productDto.date_create = product.date_create
            productDto.category = category
            productsDto.push(productDto)
        }
       
        return res.json(
          {
            total,
            page,   
            totalPages: Math.ceil(total / limit),
            products: productsDto   
          }
        )
      } catch( e ) {
        console.log(e)
      }
    }

    async createProduct(req, res) {
      try {
        const {seoTitle, seoDescription, name, slug, price, description, category, isPopular, isNewProduct} = req.body
        const newProduct = await Product.create( {seoTitle, seoDescription, name, slug, price, description, category, isPopular, isNewProduct} )
        return res.json({ok: true})
      } catch( e ) {
        console.log(e)
      }
    }

    async deleteProduct(req, res) {
      try {
        const id = req.body.id
        const candidate = await Product.findById(id)

        if (!candidate) {
          return res.status(404).json({message: 'Product not found'})
        }

        const product = await Product.deleteOne(candidate)
        return res.json({status: 'ok', product})

      } catch( e ) {
        return res.json({status: 'false'})
      }
    }
}

module.exports = new Products()