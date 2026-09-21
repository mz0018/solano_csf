export const printQr = (qrCode: string, ticketCode: string) => {
  const printWindow = window.open("", "_blank", "width=500,height=600")

  if (!printWindow) return

  printWindow.document.write(`
    <html>
      <head>
        <title>Ticket ${ticketCode}</title>
        <style>
          body {
            margin: 0;
            padding: 30px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-family: Arial, sans-serif;
          }

          .ticket-code {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
          }

          img {
            width: 256px;
            height: 256px;
          }

          @media print {
            body {
              padding: 0;
            }
          }
        </style>
      </head>

      <body>
        <div class="ticket-code">
          ${ticketCode}
        </div>

        <img src="${qrCode}" alt="Ticket QR Code" />

        <script>
          window.onload = function () {
            window.print()

            window.onafterprint = function () {
              window.close()
            }
          }
        </script>
      </body>
    </html>
  `)

  printWindow.document.close()
}
