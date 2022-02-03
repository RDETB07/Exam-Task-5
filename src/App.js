import './App.css';
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Fragment, useEffect, useState } from 'react';
import ProductData from './products.json'

function App() {

  const [data, setData] = useState(ProductData)
  const [data2, setData2] = useState(ProductData)

  const [totalQuantity, setTotalQuantity] = useState()
  const [totalCost, setTotalCost] = useState()
  const [averagePrice, setAveragePrice] = useState()
  const [mostExpensiveProduct, setMostExpensiveProduct] = useState()
  const [mostCheapestProduct, setMostCheapestProduct] = useState()

  function onlyUniqueCategory() {
    return data.map(data => data.Category)
      .filter((value, index, self) => self.indexOf(value) === index)
  }

  function onlyUniqueManufacturer() {
    return data.map(data => data.Manufacturer)
      .filter((value, index, self) => self.indexOf(value) === index)
  }

  const [uniqueCategory, setUniqueCategory] = useState(onlyUniqueCategory)
  const [uniqueManufacturer, setUniqueManufacturer] = useState(onlyUniqueManufacturer())

  //

  let filterCategory = []
  let filterManufacturer = []
  let filterCombined = []


  const [showOptions, setShowOptions] = useState(false)
  let filterPriceHighest = ''
  let filterPriceLowest = ''
  const [isValidPriceRange, setIsValidPriceRange] = useState(true)

  let filterAllCategory = false
  let filterAllManufacturer = false

  const checkedFilterCategory = (e, index) => {
    if (e.target.checked === true) {
      filterCategory.push(index)
      filterCombined.push({ Category: index })
    }

    if (e.target.checked === false) {
      filterCategory = filterCategory.filter(function (item) {
        return item !== index
      })

      filterCombined = filterCombined.filter(function (item) {
        return item.Category !== index
      })
    }
  }

  const checkedFilterManufacturer = (e, index) => {
    if (e.target.checked === true) {
      filterManufacturer.push(index)
      filterCombined.push({ Manufacturer: index })
    }

    if (e.target.checked === false) {
      filterManufacturer = filterManufacturer.filter(function (item) {
        return item !== index
      })

      filterCombined = filterCombined.filter(function (item) {
        return item.Manufacturer !== index
      })
    }
  }

  let newData = []
  let exceptNewData = []
  let dataFiltered = []


  const handleLowestChange = (e) => {
    e.preventDefault()

    filterPriceLowest = e.target.value
  }

  const handleHighestChange = (e) => {
    e.preventDefault()

    filterPriceHighest = e.target.value
  }

  const applySettings = async (e) => {
    e.preventDefault()

    if ((filterPriceHighest < filterPriceLowest) && (filterPriceHighest !== '' && filterPriceLowest !== '')) {
      setIsValidPriceRange(false)
    } else {
      setIsValidPriceRange(true)
    }

    if (isValidPriceRange === false) {
      return
    }

    function onlyUniqueData(newData) {
      return newData.map(data => data)
        .filter((value, index, self) => self.indexOf(value) === index)
    }

    if (filterCombined.length !== 0) {
      if (filterAllCategory === true || filterAllManufacturer === true) {
        if (filterAllCategory === true) {
          filterCombined.map((indexData, index) => {
            if (exceptNewData.length !== 0) {
              dataFiltered = exceptNewData.filter(function (item) {
                return item.Category !== uniqueCategory[indexData.Category]
              })
              exceptNewData = dataFiltered
            } else {
              dataFiltered = data.filter(function (item) {
                return item.Category !== uniqueCategory[indexData.Category]
              })
              exceptNewData.push(...dataFiltered)
            }
            newData = exceptNewData
          })
        } else {
          if (filterCategory.length !== 0) {
            filterCombined.map(async (indexData, index) => {
              dataFiltered = data.filter(function (item) {
                return item.Category === uniqueCategory[indexData.Category]
              })
              newData.push(...dataFiltered)
            })
          }
        }


        if (filterManufacturer.length !== 0) {
          if (newData.length !== 0) {
            exceptNewData = []

            if (filterAllManufacturer === true) {
              filterCombined.map((indexData, index) => {

                if (exceptNewData.length !== 0) {
                  dataFiltered = exceptNewData.filter(function (item) {
                    return item.Manufacturer !== uniqueManufacturer[indexData.Manufacturer]
                  })
                  exceptNewData = dataFiltered
                } else {
                  dataFiltered = newData.filter(function (item) {
                    return item.Manufacturer !== uniqueManufacturer[indexData.Manufacturer]
                  })
                  exceptNewData.push(...dataFiltered)
                }
                newData = exceptNewData
              })
            } else {
              filterCombined.map((indexData, index) => {
                dataFiltered = newData.filter(function (item) {
                  return item.Manufacturer === uniqueManufacturer[indexData.Manufacturer]
                })
                exceptNewData.push(...dataFiltered)
              })
              newData = exceptNewData
            }
          } else {
            exceptNewData = []

            if (filterAllManufacturer === true) {
              filterCombined.map((indexData, index) => {

                if (exceptNewData.length !== 0) {
                  dataFiltered = exceptNewData.filter(function (item) {
                    return item.Manufacturer !== uniqueManufacturer[indexData.Manufacturer]
                  })
                  exceptNewData = dataFiltered
                } else {
                  dataFiltered = data.filter(function (item) {
                    return item.Manufacturer !== uniqueManufacturer[indexData.Manufacturer]
                  })
                  exceptNewData.push(...dataFiltered)
                }
                newData = exceptNewData
              })
            } else {
              filterCombined.map((indexData, index) => {

                if (exceptNewData.length !== 0) {
                  dataFiltered = exceptNewData.filter(function (item) {
                    return item.Manufacturer === uniqueManufacturer[indexData.Manufacturer]
                  })
                  exceptNewData = dataFiltered
                } else {
                  dataFiltered = data.filter(function (item) {
                    return item.Manufacture === uniqueManufacturer[indexData.Manufacturer]
                  })
                  exceptNewData.push(...dataFiltered)
                }
                newData = exceptNewData
              })
            }
          }

        }
      } else {

        filterCombined.map(async (indexData, index) => {
          dataFiltered = data.filter(function (item) {

            return item.Category === uniqueCategory[indexData.Category] || item.Manufacturer === uniqueManufacturer[indexData.Manufacturer]
          })
          newData.push(...dataFiltered)

        })
      }

      if (filterPriceLowest !== '' || filterPriceHighest !== '') {
        if (filterPriceHighest !== '' && filterPriceLowest !== '') {
          if (newData.length !== 0) {
            dataFiltered = newData.filter(function (item) {
              return (item.Price > filterPriceLowest && item.Price < filterPriceHighest)
            })
            newData = dataFiltered
          } else {
            dataFiltered = data.filter(function (item) {
              return (item.Price > filterPriceLowest && item.Price < filterPriceHighest)
            })
            newData.push(...dataFiltered)
          }
        } else if (filterPriceHighest !== '') {


          if (newData.length !== 0) {
            dataFiltered = newData.filter(function (item) {
              return (item.Price < filterPriceHighest)
            })
            newData = dataFiltered
          } else {
            dataFiltered = data.filter(function (item) {
              return (item.Price < filterPriceHighest)
            })
            newData.push(...dataFiltered)
          }
        } else if (filterPriceLowest !== '') {
          if (newData.length !== 0) {

            dataFiltered = newData.filter(function (item) {
              return (item.Price > filterPriceLowest)
            })
            newData = dataFiltered
          } else {
            dataFiltered = data.filter(function (item) {
              return (item.Price > filterPriceLowest)
            })
            newData.push(...dataFiltered)
          }
        }
      }
    }
    setData2(onlyUniqueData(newData).sort(function (a, b) {
      return a.id - b.id
    }))
    filterAllManufacturer = false
    filterAllCategory = false
    setShowOptions(false)
  }

  const resetSettings = (e) => {
    e.preventDefault(e)
    setData2(ProductData)
    setShowOptions(false)
    filterAllManufacturer = false
    filterAllCategory = false
  }

  useEffect(() => {

    let tempTotal = 0
    let tempAverage = 0
    let tempExpensiveName = ''
    let tempExpensivePrice = 0
    let tempCheapestName = ''
    let tempCheapestPrice = 0

    data2.map((data) => {
      tempTotal += parseInt(data.Price)
      tempAverage = Math.round(tempTotal / data2.length)

      if (tempExpensivePrice < data.Price) {
        tempExpensiveName = data.Category
        tempExpensivePrice = data.Price
      }

      if (tempCheapestPrice === 0) {
        tempCheapestName = data.Category
        tempCheapestPrice = data.Price
      } else if (tempCheapestPrice > data.Price) {
        tempCheapestName = data.Category
        tempCheapestPrice = data.Price
      }
    })
    setTotalQuantity(data2.length)
    setTotalCost(tempTotal)
    setAveragePrice(tempAverage)
    setMostExpensiveProduct(`${tempExpensiveName} @ ${tempExpensivePrice}`)
    setMostCheapestProduct(`${tempCheapestName} @ ${tempCheapestPrice}`)

  }, [data2])

  const setFilterAllExceptManufacturerFunction = (e) => {
    filterAllManufacturer = e.target.checked
  }

  const setFilterAllExceptCategoryFunction = (e) => {
    filterAllCategory = e.target.checked
  }

  const [order, setOrder] = useState("ASC")
  const sorting = (col) => {

    switch (col) {
      case "id":
      case "Price":
        if (order === "ASC") {
          const sorted = [...data2].sort((a, b) =>
            a[col] > b[col] ? 1 : -1
          )
          setData2(sorted)
          setOrder("DSC")
        }
        if (order === "DSC") {
          const sorted = [...data2].sort((a, b) =>
            a[col] < b[col] ? 1 : -1
          )
          setData2(sorted)
          setOrder("ASC")
        }
        break;
      default:
        if (order === "ASC") {
          const sorted = [...data2].sort((a, b) =>
            a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
          )
          setData2(sorted)
          setOrder("DSC")
        }
        if (order === "DSC") {
          const sorted = [...data2].sort((a, b) =>
            a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
          )
          setData2(sorted)
          setOrder("ASC")
        }
    }
  }
  return (
    <Fragment>
      <Container fluid className="py-5">
        <Row>
          <Col className="col-12 d-flex justify-content-center mt-5">
            <h1>Products Table (Bootstrap)</h1>
          </Col>
          <Col className="col-12 d-flex justify-content-center">
            <Button variant="primary" className="my-5" onClick={e => (showOptions === false) ? setShowOptions(true) : setShowOptions(false)}>Options</Button>
          </Col>
          <Col className="col-12 border d-flex justify-content-center">
            <Row>
              <Col className="col-auto">
                <h5>Total Quantity: {totalQuantity}</h5>
              </Col>
              <Col className="col-auto">
                <h5>Total Cost: {totalCost}</h5>
              </Col>
              <Col className="col-auto">
                <h5>Average Price: {averagePrice}</h5>
              </Col>
              <Col className="col-auto">
                <h5>Most Expensive Product: {mostExpensiveProduct}</h5>
              </Col>
              <Col className="col-auto">
                <h5>Most Cheapest Product: {mostCheapestProduct}</h5>
              </Col>
            </Row>
          </Col>
          <Row className="d-flex justify-content-center">
            {
              (showOptions === false) ?
                <></>
                :
                <Col className="col-4 border">
                  <Form onSubmit={e => applySettings(e)}>
                    <Row>
                      <Col className="col-12">
                        <h1 className="text-center">Filter Options</h1>
                      </Col>
                      <Col className="col-12">
                        <h5 className="text-center">Filter by Category</h5>
                      </Col>
                      <Col className="col-12 mb-5">
                        <Form.Check
                          onClick={(e) => setFilterAllExceptCategoryFunction(e)}
                          type="checkbox"
                          label="All Category Except"
                        />
                      </Col>
                      {
                        uniqueCategory.map((data, index) => {
                          return <Col key={`${index}${data.id}${Math.random()}`} className="col-auto mb-5">
                            <Form.Check
                              onClick={e => checkedFilterCategory(e, index)}
                              type="checkbox"
                              label={data}
                            />
                          </Col>
                        })
                      }
                      <Col className="col-12">
                        {
                          (isValidPriceRange === false) ?
                            <h5 className="text-center">Filter by Price <span className="text-danger">INVALID PRICE RANGE</span></h5>
                            :
                            <h5 className="text-center">Filter by Price</h5>
                        }

                      </Col>
                      <Row className="d-flex justify-content-center">
                        <Col className="col-auto">
                          <Form.Group className="mb-3" controlId="Minimum Price">
                            <Form.Label>Min Price: </Form.Label>
                            <Form.Control
                              type="number"
                              min="1"
                              onChange={(e) => handleLowestChange(e)}
                              placeholder="Minimum Price"
                            />
                          </Form.Group>
                        </Col>
                        <Col className="col-auto">
                          <Form.Group className="mb-3" controlId="Maximum Price">
                            <Form.Label>Max Price: </Form.Label>
                            <Form.Control
                              type="number"
                              min="1"
                              onChange={(e) => handleHighestChange(e)}
                              placeholder="Maximum Price"
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Col className="col-12">
                        <h5 className="text-center">Filter by Manufacturer</h5>
                      </Col>
                      <Col className="col-12 mb-5">
                        <Form.Check
                          onChange={e => setFilterAllExceptManufacturerFunction(e)}
                          type="checkbox"
                          label="All Manufacturer Except"
                        />
                      </Col>
                      {
                        uniqueManufacturer.map((data, index) => {
                          return <Col key={`${index}${data.id}${Math.random()}`} className="col-auto mb-5">
                            <Form.Check
                              onClick={e => checkedFilterManufacturer(e, index)}
                              value={data}
                              type="checkbox"
                              label={data}
                            />
                          </Col>
                        })
                      }
                      <Col className="col-12 d-flex justify-content-center">
                        <Button variant="success" className="mx-5" type="submit">Apply</Button>
                        <Button variant="secondary" className="mx-5" onClick={e => resetSettings(e)}>Reset</Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
            }
            <Col className="col-8 d-flex justify-content-center">
              <Table striped bordered hover>
                <thead>
                  <tr style={{ cursor: "pointer" }}>
                    <th onClick={() => sorting("id")}>#</th>
                    <th onClick={() => sorting("Category")}>Category</th>
                    <th onClick={() => sorting("Price")}>Price</th>
                    <th onClick={() => sorting("Manufacturer")}>Manufacturer</th>
                    <th onClick={() => sorting("ProductionDate")}>Production Date</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data2.map((data, index) => {
                      return <tr key={data.id}>
                        <td>{data.id}</td>
                        <td>{data.Category}</td>
                        <td>{data.Price}</td>
                        <td>{data.Manufacturer}</td>
                        <td>{data.ProductionDate}</td>
                      </tr>
                    })
                  }
                </tbody>
              </Table>
            </Col>
          </Row>

        </Row>
      </Container>
    </Fragment >
  );
}

export default App;
