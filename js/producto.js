        const selectCategoria = document.getElementById('categoria');
        const subtitulo = document.getElementById('subtitulo');
        const contenedorProductos = document.getElementById('productos-container');

        // Productos con categoría y subcategoría
        const productos = [
            {categoria: 'bocas', subcategoria: 'clásicas', img: 'img/logo.png', alt: 'Palitos de queso', descripcion: 'Palitos de Queso', precio: '₡2,500'},
            {categoria: 'bocas', subcategoria: 'clásicas', img: 'img/logo.png', alt: 'Papas Fritas', descripcion: 'Papas Fritas', precio: '₡2,500'},
            {categoria: 'bocas', subcategoria: 'clásicas', img: 'img/logo.png', alt: 'Chicharrones', descripcion: 'Chicharrones', precio: '₡2,500'},
            {categoria: 'bocas', subcategoria: 'clásicas', img: 'img/logo.png', alt: 'Alitas', descripcion: 'Alitas', precio: '₡2,500'},
            {categoria: 'bocas', subcategoria: 'clásicas', img: 'img/alitasPapa.jpeg', alt: 'Alitas con papas', descripcion: 'Alitas con papas', precio: '₡3,000'},

            {categoria: 'bocas', subcategoria: 'típicas', img: 'img/logo.png', alt: 'Frijoles a las Trancas', descripcion: 'Frijoles a las Trancas', precio: '₡2,500'},
            {categoria: 'bocas', subcategoria: 'típicas', img: 'img/logo.png', alt: 'Higado Encebollado', descripcion: 'Higado Encebollado', precio: '₡2,500'},
            {categoria: 'bocas', subcategoria: 'típicas', img: 'img/logo.png', alt: 'Bistec Encebollado', descripcion: 'Bistec Encebollado', precio: '₡2,500'},
            {categoria: 'bocas', subcategoria: 'típicas', img: 'img/ceviche.jpeg', alt: 'Ceviche', descripcion: 'Ceviche', precio: '₡2,500'},
            {categoria: 'bocas', subcategoria: 'típicas', img: 'img/chifrijo.jpeg', alt: 'Chifrijo', descripcion: 'Chifrijo', precio: '₡3,500'},
            


            {categoria: 'bebidas', subcategoria: 'gaseosa', img: 'img/refresco.jpg', alt: 'Gaseosas', descripcion: 'Refresco Gaseoso', precio: '₡1,500'},
            {categoria: 'bebidas', subcategoria: 'gaseosa', img: 'img/jugo.jpg', alt: 'Soda', descripcion: 'Soda', precio: '₡1,500'},

            {categoria: 'bebidas', subcategoria: 'natural', img: 'img/gaseosa.jpg', alt: 'Té Frio', descripcion: 'Té Frio', precio: '₡1,500'},
            
            {categoria: 'bebidas', subcategoria: 'cerveza', img: 'img/gaseosa2.jpg', alt: 'Cerveza Nacional', descripcion: 'Cerveza Nacional', precio: '₡1,500'},

            {categoria: 'bebidas', subcategoria: 'otros', img: 'img/gaseosa2.jpg', alt: 'Bebida en lata(varios)', descripcion: 'Bebida en lata(varios)', precio: '₡2,000'},

            {categoria: 'bebidas', subcategoria: 'bebidas Preparadas', img: 'img/evento1.jpg', alt: 'Sangria', descripcion: 'Sangria', precio: '₡2,000'},
            {categoria: 'bebidas', subcategoria: 'bebidas Preparadas', img: 'img/evento1.jpg', alt: 'Mamaditas', descripcion: 'Mamaditas', precio: '₡1,500'}, 

            {categoria: 'platosVariados', subcategoria: '', img: 'img/evento1.jpg', alt: 'Chifrijo', descripcion: 'Chifrijo', precio: '₡3,500'},
            {categoria: 'platosVariados', subcategoria: '', img: 'img/evento1.jpg', alt: 'Salchipapas', descripcion: 'Salchipapas', precio: '₡3,000'},

            {categoria: 'tragos', subcategoria: '', img: 'img/evento1.jpg', alt: 'Johnnie Black', descripcion: 'Johnnie Black', precio: '₡3,500'},
            {categoria: 'tragos', subcategoria: '', img: 'img/evento1.jpg', alt: 'Flor de Caña 18', descripcion: 'Flor de Caña 18', precio: '₡3,500'},
            {categoria: 'tragos', subcategoria: '', img: 'img/evento1.jpg', alt: 'Jack Daniels', descripcion: 'Jack Daniels', precio: '₡3,000'},
            {categoria: 'tragos', subcategoria: '', img: 'img/evento1.jpg', alt: 'Tequila Don Julio', descripcion: 'Tequila Don Julio', precio: '₡3,500'},
            {categoria: 'tragos', subcategoria: '', img: 'img/evento1.jpg', alt: 'Baileys', descripcion: 'Baileys', precio: '₡2,000'}, 
        ];

        const textosSubtitulo = {
            todos: 'Todos los productos',
            bebidas: 'Bebidas',
            bocas: 'Bocas',
            platosVariados: 'Platos Variados',
            tragos: 'Tragos'
        };

        function crearProductoHTML(producto) {
    return `
        <article class="producto">
            <img src="${producto.img}" alt="${producto.alt}" />
            <div class="descripcion">${producto.descripcion}</div>
            <div class="precio">${producto.precio}</div>
        </article>
    `;
}


        function filtrarProductos() {
            const categoria = selectCategoria.value;

            // Actualizar subtítulo
            subtitulo.textContent = textosSubtitulo[categoria] || 'Productos';

            contenedorProductos.innerHTML = ''; // Limpiar productos previos

            if (categoria === 'todos') {
                // Agrupar por categoría y subcategoría
                const agrupados = {};

                productos.forEach(p => {
                    const cat = p.categoria || 'otros';
                    const subcat = p.subcategoria || '';
                    if (!agrupados[cat]) agrupados[cat] = {};
                    if (!agrupados[cat][subcat]) agrupados[cat][subcat] = [];
                    agrupados[cat][subcat].push(p);
                });

                let primeraCategoria = true;

                for (const cat in agrupados) {
                    
                    primeraCategoria = false;

                    // Título categoría
                    contenedorProductos.innerHTML += `<h3 style="width: 100%; margin-left: 0; text-transform: capitalize; color: #00ffff;">${cat}</h3>`;


                    for (const subcat in agrupados[cat]) {
                        if (subcat) contenedorProductos.innerHTML += `<h4 style="width: 100%; margin-left: 20px; font-style: italic; text-transform: capitalize; color: #fff;">${subcat}</h4>`;
                        agrupados[cat][subcat].forEach(producto => {
                            contenedorProductos.innerHTML += crearProductoHTML(producto);
                        });
                    }
                }
            } else {
                // Mostrar solo categoría seleccionada
                const agrupadosSub = {};
                productos.filter(p => p.categoria === categoria).forEach(p => {
                    const subcat = p.subcategoria || 'Otros';
                    if (!agrupadosSub[subcat]) agrupadosSub[subcat] = [];
                    agrupadosSub[subcat].push(p);
                });

                for (const subcat in agrupadosSub) {
                    contenedorProductos.innerHTML += `<h3 style="width: 100%; margin-left: 0; text-transform: capitalize; color: #fff;">${subcat}</h3>`;
                    agrupadosSub[subcat].forEach(producto => {
                        contenedorProductos.innerHTML += crearProductoHTML(producto);
                    });
                }
            }
        }

        selectCategoria.addEventListener('change', filtrarProductos);
        filtrarProductos(); // Mostrar al cargar