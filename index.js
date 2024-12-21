
function generarCotizacion() {
    const numeroCotizacion = document.getElementById('numeroCotizacion').value;
    const nombreCliente = document.getElementById('nombreCliente').value;
    const tipoEvento = document.getElementById('tipoEvento').value;
    const fechaEvento = document.getElementById('fechaEvento').value;
    const duracionEvento = document.getElementById('duracionEvento').value;
    const direccionEvento = document.getElementById('direccionEvento').value;
    const horaEvento = document.getElementById('horaEvento').value;
    const fechaInstalacion = document.getElementById('fechaInstalacion').value || '';
    const tipoMuro = document.getElementById('tipoMuro').value;
    const precioBase = parseFloat(document.getElementById('precioBase').value);
    const equiposInclusion = document.getElementById('equiposInclusion').value;

    if (!numeroCotizacion || !nombreCliente || !tipoEvento || !fechaEvento || !duracionEvento || !tipoMuro || !direccionEvento || !horaEvento || isNaN(precioBase)) {
        alert('Por favor, complete todos los campos requeridos antes de generar la cotización.');
        return;
    }

    const iva = precioBase * 0.19;
    const valorTotal = precioBase + iva;
    const reserva = valorTotal * 0.50;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Establecer el fondo del documento
    doc.setFillColor(115, 187, 255); // Color de fondo del documento
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');

    const img1 = new Image();
    img1.src = 'https://i0.wp.com/escalandia.cl/wp-content/uploads/2024/08/big_escalandia.webp?w=1024&ssl=1';
    img1.onload = function() {
        doc.addImage(img1, 'WEBP', 50, 5, 100, 40);

        const img2 = new Image();
        img2.src = 'https://i0.wp.com/escalandia.cl/wp-content/uploads/2024/08/mall1-2.webp?w=800&ssl=1';
        img2.onload = function() {
            doc.addImage(img2, 'WEBP', 0, 110, 210, 150);

            const datosGenerales = [
                ['Número de Cotización', numeroCotizacion],
                ['Nombre del Cliente', nombreCliente],
                ['Tipo de Evento', tipoEvento],
                ['Fecha del Evento', fechaEvento],
                ['Duración del Evento (Horas)', duracionEvento],
                ['Dirección del Evento', direccionEvento],
                ['Horario del Evento', horaEvento],
                ['Fecha y Hora de Instalación', fechaInstalacion],
                ['Tipo de Servicio', tipoMuro === "6 Metros" ? "Muro 6 Metros" : "Slackline"],
                ['Incluye: ', equiposInclusion === "incluye" ? "Cascos, arnés, cuerda, equipos de seguridad, supervisión 100%" : " "]
            ];

            const headersGenerales = [['Descripción', 'Datos']];
            
            doc.autoTable({
                head: headersGenerales,
                body: datosGenerales,
                startY: 60,
                theme: 'grid'
            });

            const datosPrecios = [
                ['Subtotal (Neto)', `$${precioBase.toLocaleString()}`],
                ['IVA (19%)', `$${iva.toLocaleString()}`],
                ['Valor Total', `$${valorTotal.toLocaleString()}`]
            ];

            const headersPrecios = [['Descripción', 'Valores']];
            
            doc.autoTable({
                head: headersPrecios,
                body: datosPrecios,
                startY: doc.autoTable.previous.finalY + 10,
                theme: 'grid'
            });

            const datosBancarios = [
                ['Banco', 'Banco Estado - Chequera Electrónica'],
                ['N° Cuenta', '23670189651'],
                ['Titular', 'Producciones Deportivas Piero Nicolini Perales EIRL'],
                ['RUT', '76.756.323-K'],
                ['Email', 'piero@escalandia.cl']
            ];

            const headersBancarios = [['Datos ', 'Bancarios']];
            
            doc.autoTable({
                head: headersBancarios,
                body: datosBancarios,
                startY: doc.autoTable.previous.finalY + 10,
                theme: 'grid'
            });

            const datosReserva = [
                ['50% Inicial', `$${reserva.toLocaleString()}`],
                ['50% Post Evento', `$${reserva.toLocaleString()}`]
            ];

            const headersReserva = [['Reserva', 'Valor']];
            
            doc.autoTable({
                head: headersReserva,
                body: datosReserva,
                startY: doc.autoTable.previous.finalY + 10,
                theme: 'grid'
            });

            doc.text('**Cotización válida por 15 días. Damos prioridad a quien reserva primero.', 10, doc.autoTable.previous.finalY + 11);

            doc.save('cotizacion.pdf');
        };
    };
}