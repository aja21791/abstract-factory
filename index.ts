/**
 * La interfaz FabricaAbstracta declara un conjunto de métodos que devuelven
 * diferentes productos abstractos. Estos productos se llaman familia y están
 * relacionados por un tema o concepto de alto nivel. Los productos de una familia suelen ser
 * capaces de colaborar entre ellos. Una familia de productos puede tener varias
 * variantes, pero los productos de una variante son incompatibles con los productos de
 * otra.
 */
interface FabricaAbstracta {
    crearProductoA(): ProductoAbstractoA;

    crearProductoB(): ProductoAbstractoB;
}

/**
 * Las FabricasConcretas producen una familia de productos que pertenecen a una sola
 * variante. La fábrica garantiza que los productos resultantes son compatibles. Nota
 * que las firmas de los métodos de FabricaConcreta devuelven un producto abstracto,
 * mientras que dentro del método se crea una instancia de un producto concreto.
 */
class FabricaConcreta1 implements FabricaAbstracta {
    public crearProductoA(): ProductoAbstractoA {
        return new ProductoConcretoA1();
    }

    public crearProductoB(): ProductoAbstractoB {
        return new ProductoConcretoB1();
    }
}

/**
 * Cada FabricaConcreta tiene una variante de producto correspondiente.
 */
class FabricaConcreta2 implements FabricaAbstracta {
    public crearProductoA(): ProductoAbstractoA {
        return new ProductoConcretoA2();
    }

    public crearProductoB(): ProductoAbstractoB {
        return new ProductoConcretoB2();
    }
}


/**
 * Cada producto distinto de una familia de productos debe tener una interfaz base. Todas
 * las variantes del producto deben implementar esta interfaz.
 */
interface ProductoAbstractoA {
    funcionUtilA(): string;
}

/**
 * Estos ProductosConcretos son creados por las FabricasConcretas correspondientes.
 */
class ProductoConcretoA1 implements ProductoAbstractoA {
    public funcionUtilA(): string {
        return 'El resultado del producto A1.';
    }
}

class ProductoConcretoA2 implements ProductoAbstractoA {
    public funcionUtilA(): string {
        return 'El resultado del producto A2.';
    }
}

/**
 * Aquí está la interfaz base de otro producto. Todos los productos pueden interactuar
 * entre sí, pero la interacción adecuada sólo es posible entre productos de
 * la misma variante concreta.
 */
interface ProductoAbstractoB {
    /**
     * El Producto B es capaz de hacer lo suyo...
     */
    funcionUtilB(): string;

    /**
     * ...pero también puede colaborar con el ProductoA.
     *
     * La FabricaAbstracta se asegura de que todos los productos que crea sean de la
     * misma variante y por tanto, compatible.
     */
    otraFuncionUtilB(colaborador: ProductoAbstractoA): string;
}

/**
 * Estos ProductosConcretos son creados por las FabricasConcretas correspondientes.
 */
class ProductoConcretoB1 implements ProductoAbstractoB {

    public funcionUtilB(): string {
        return 'El resultado del producto B1.';
    }

    /**
     * La variante, Producto B1, solo puede funcionar correctamente con la variante,
     * Producto A1. Sin embargo, acepta cualquier instancia de ProductoAbstractoA como
     * un argumento.
     */
    public otraFuncionUtilB(colaborador: ProductoAbstractoA): string {
        const resultado = colaborador.funcionUtilA();
        return `El resultado de B1 colaborando con el (${resultado})`;
    }
}

class ProductoConcretoB2 implements ProductoAbstractoB {

    public funcionUtilB(): string {
        return 'El resultado del producto B2.';
    }

    /**
     * La variante, Producto B2, solo puede funcionar correctamente con la variante,
     * Producto A2. Sin embargo, acepta cualquier instancia de ProductoAbstractoA como
     * un argumento.
     */
    public otraFuncionUtilB(colaborador: ProductoAbstractoA): string {
        const resultado = colaborador.funcionUtilA();
        return `El resultado de B2 colaborando con el (${resultado})`;
    }
}

/**
 * El código del cliente funciona con fábricas y productos solo a través de tipos abstractos.
 * Esto le permitirá pasar cualquier fábrica o
 * subclase de producto al código del cliente sin romperlo.
 */
function codigoCliente(fabrica: FabricaAbstracta) {
    const productoA = fabrica.crearProductoA();
    const productoB = fabrica.crearProductoB();

    console.log(productoB.funcionUtilB());
    console.log(productoB.otraFuncionUtilB(productoA));
}

/**
 * El código del cliente puede funcionar con cualquier clase de fábrica concreta.
 */
console.log('Cliente: Probando el código del cliente con el primer tipo de fábrica...');
codigoCliente(new FabricaConcreta1());

console.log('');

console.log('Cliente: Probando el mismo código del cliente con el segundo tipo de fábrica...');
codigoCliente(new FabricaConcreta2());