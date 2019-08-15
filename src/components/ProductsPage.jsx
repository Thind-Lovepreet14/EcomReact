import React from 'react';

class ProductsPage extends React.Component {
    render() {
        return (
            <ProductHero />
        )
    }
}


class ProductHero extends React.Component {
    render () {
        return (
            <div>
                <div>
                    <section className="container-fluid hero">
                        <div className="hero-product">
                            <h1>Our <span className="yellow-text">Stock</span></h1>     
                        </div>
                    </section>
                    
                </div>
                <ProductList />
            </div>
        )
    }
}

class ProductList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            productsList: []
        };
    }

    componentDidMount() {
        fetch('./data/products.json')
            .then((res) => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        productsList: data.products
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                });
            


    }
    render() {
        const { error, isLoaded, productsList } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="container-fluid products-container"> 
                    <div className="row">
                        {productsList.map((product, index) => (
                            <div key="product.name" className="col-md-3 product-column">
                                {index}
                                <img className="img-fluid" src={product.imageSource} alt={product.name} />
                                <p className="text-left">
                                    <span className="product-title">{product.name}</span> 
                                    <span className="product-price">{product.price}</span>
                                    <span className="d-block item-description">{product.category}</span>
                                </p>
                            </div>
                        ))}
                    </div>
                    
                </div>
            );
        }
    }
}


export default ProductsPage;