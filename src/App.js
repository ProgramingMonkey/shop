import './App.less'
import { productList } from './product'
import apple from './assets/apple.jpeg'
import { debounce } from './utils'
import { useState } from 'react'
const prefix = 'shop'

function App() {
  // 购物车商品列表
  const [productCar, setProductCar] = useState([])
  // 购物车展示
  const [productCarShow, setProductCarShow] = useState(false)
  // 函数防抖，解决购物车按钮移至购物车列表过程中，瞬间关闭购物车列表问题
  const debounceSetProductCarShow = debounce(setProductCarShow)

  // 加入购物车
  function addProduct(product) {
    // 判断商品是否已加入购物车
    const exist = productCar.some((item) => {
      if (product.id === item.id) {
        item.count++
        return true
      }
      return false
    })

    if (exist) {
      setProductCar([...productCar])
    } else {
      setProductCar([...productCar, { ...product, count: 1 }])
    }

    alert(`加入购物车成功，${product.name}+1`)
  }

  // 移出购物车
  function deleteProduct(index) {
    productCar.splice(index, 1)
    if (!productCar.length) setProductCarShow(false)
    setProductCar([...productCar])
  }

  // 购买
  function buy() {
    let total = productCar.reduce((prev, next) => {
      return prev + next.price * next.count * 100
    }, 0)
    let message = '请先添加商品'

    total = Number((total / 100).toFixed(2))
    if (total) message = `共计${total}元`

    alert(message)
  }

  return (
    <div className={prefix}>
      <div className={`${prefix}-header`}>
        <h1>购物天堂</h1>
        <div
          className={`${prefix}-header-productCar`}
          onMouseEnter={() => {
            if (productCar.length === 0) return
            debounceSetProductCarShow(true)
          }}
          onMouseLeave={() => debounceSetProductCarShow(false)}
        >
          <button>购物车</button>
          <div className={productCarShow ? `${prefix}-header-productCar-list` : 'hidden'}>
            {productCar.map((product, index) => {
              const { id, name, price, count } = product

              return (
                <div
                  key={id}
                  className={`${prefix}-header-productCar-list-item`}
                >
                  <div
                    className={`${prefix}-header-productCar-list-item-detail`}
                  >
                    <span>{name}</span>
                    <span>
                      {price}*{count}
                    </span>
                  </div>
                  <button onClick={() => deleteProduct(index)}>删除</button>
                </div>
              )
            })}
            <button
              className={`${prefix}-header-productCar-list-buy`}
              onClick={() => buy()}
            >
              购买
            </button>
          </div>
        </div>
      </div>
      <div className={`${prefix}-content`}>
        {productList.map((product) => {
          const { id, name, price } = product

          return (
            <div className={`${prefix}-content-item`} key={id}>
              <img src={apple} alt={`${name}`} />
              <div className={`${prefix}-content-item-bottom`}>
                <div className={`${prefix}-content-item-bottom-description`}>
                  <span>{name}</span>
                  <span>{price}</span>
                </div>
                <button
                  className={`${prefix}-content-item-bottom-add`}
                  onClick={() => addProduct(product)}
                >
                  加入购物车
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
