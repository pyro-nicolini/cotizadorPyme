
function generarCotizacion() {
    const numeroCotizacion = document.getElementById('numeroCotizacion').value;
    const nombreCliente = document.getElementById('nombreCliente').value;
    const nombreEmpresa = document.getElementById('nombreEmpresa').value;
    const tipoEvento = document.getElementById('tipoEvento').value;
    const fechaEvento = document.getElementById('fechaEvento').value;
    const duracionEvento = document.getElementById('duracionEvento').value;
    const direccionEvento = document.getElementById('direccionEvento').value;
    const horaEvento = document.getElementById('horaEvento').value;
    const fechaInstalacion = document.getElementById('fechaInstalacion').value || '';
    const tipoMuro = document.getElementById('tipoMuro').value;
    const precioBase = parseFloat(document.getElementById('precioBase').value);
    const equiposInclusion = document.getElementById('equiposInclusion').value;

    const cotizador = document.querySelector('h1').innerText;

    if (!numeroCotizacion || !nombreCliente || !nombreEmpresa || !tipoEvento || !fechaEvento || !duracionEvento || !tipoMuro || !direccionEvento || !horaEvento || isNaN(precioBase)) {
        alert('Por favor, complete todos los campos requeridos antes de generar la cotización.');
        // return;
    } 

    const iva = precioBase * 0.19;
    const valorTotal = precioBase + iva;
    const reserva = valorTotal * 0.50;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Establecer el fondo del documento
    doc.setFillColor(47, 7, 69); // Color de fondo del documento
    doc.setTextColor(255, 255, 255); 
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');

    const img1 = new Image();
    img1.src = 'https://i0.wp.com/escalandia.cl/wp-content/uploads/2024/08/big_escalandia.webp?w=1024&ssl=1';
    img1.onload = function() {
        doc.addImage(img1, 'WEBP', 40, 5, 100, 40);

        doc.text(cotizador, 50, 50);

        const img2 = new Image();
        img2.src = 'https://i0.wp.com/escalandia.cl/wp-content/uploads/2024/08/mall1-2.webp?w=800&ssl=1';
        img2.onload = function() {
            doc.addImage(img2, 'WEBP', 0, 110, 210, 150);

            

            const datosGenerales = [
                ['N° Cotización:', numeroCotizacion],
                ['Contacto:', nombreCliente],
                ['Empresa:', nombreEmpresa],
                ['Tipo de Evento:', tipoEvento],
                ['Fecha del Evento:', fechaEvento],
                ['Duración del Evento (Horas):', duracionEvento],
                ['Horario del Evento:', horaEvento],
                ['Dirección del Evento:', direccionEvento],
                ['Fecha y Hora de Instalación:', fechaInstalacion],
                ['Tipo de Servicio:', tipoMuro === "6 Metros" ? "Muro 6 Metros" : "Slackline"],
                ['Incluye: ', equiposInclusion === "incluye" ? "Cascos, arnés, cuerda, equipos de seguridad, supervisión 100%" : " "]
            ];

            const headersGenerales = [['Descripción', 'Datos']];
            
            doc.autoTable({
                head: headersGenerales,
                body: datosGenerales,
                startY: 60,
                theme: 'grid',
                styles: {
                    textColor: [255, 255, 255], // Color blanco para el texto dentro de las tablas
                    fillColor: [47, 7, 69] // Opcional: Color de fondo de las celdas
                }
            });

            const datosPrecios = [
                ['Sub-Total (Neto):', `$${precioBase.toLocaleString()}`],
                ['IVA (19%):', `$${iva.toLocaleString()}`],
                ['Valor Total:', `$${valorTotal.toLocaleString()}`]
            ];

            const headersPrecios = [['Descripción', 'Valores']];
            
            doc.autoTable({
                head: headersPrecios,
                body: datosPrecios,
                startY: doc.autoTable.previous.finalY + 10,
                theme: 'grid',
                styles: {
                    textColor: [255, 255, 255], // Color blanco para el texto dentro de las tablas
                    fillColor: [47, 7, 69] // Opcional: Color de fondo de las celdas
                }
            });

            const datosBancarios = [
                ['Banco:', 'Banco Estado - Chequera Electrónica'],
                ['N° Cuenta:', '23670189651'],
                ['Titular:', 'Producciones Deportivas Piero Nicolini Perales EIRL'],
                ['RUT:', '76.756.323-K'],
                ['Email:', 'piero@escalandia.cl']
            ];

            const headersBancarios = [['Datos ', 'Bancarios']];
            
            doc.autoTable({
                head: headersBancarios,
                body: datosBancarios,
                startY: doc.autoTable.previous.finalY + 10,
                theme: 'grid',
                styles: {
                    textColor: [255, 255, 255], // Color blanco para el texto dentro de las tablas
                    fillColor: [47, 7, 69] // Opcional: Color de fondo de las celdas
                }
            });

            const datosReserva = [
                ['50% Previo Evento:', `$${reserva.toLocaleString()}`],
                ['50% Post-Evento:', `$${reserva.toLocaleString()}`]
            ];

            const headersReserva = [['Reserva', 'Valor']];
            
            doc.autoTable({
                head: headersReserva,
                body: datosReserva,
                startY: doc.autoTable.previous.finalY + 10,
                theme: 'grid',
                styles: {
                    textColor: [255, 255, 255], // Color blanco para el texto dentro de las tablas
                    fillColor: [47, 7, 69] // Opcional: Color de fondo de las celdas
                }
            });

            doc.text('**Cotización válida por 15 días. Damos prioridad a quien reserva primero.', 10, doc.autoTable.previous.finalY + 11);

            doc.save('cotizacion.pdf');
        };
    };
}