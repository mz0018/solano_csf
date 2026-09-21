export const printQr = (qrCode: string, ticketCode: string) => {
  const printWindow = window.open("", "_blank", "width=500,height=300")

  if (!printWindow) return

  printWindow.document.write(`
    <html>
      <head>
        <title>Ticket ${ticketCode}</title>

        <script src="https://cdn.tailwindcss.com"></script>
      </head>

      <body class="m-0 bg-white p-5 font-sans">

        <div class="flex w-full items-center gap-5">

          <!-- QR CODE -->
          <div class="flex h-[150px] w-[150px] shrink-0 items-center justify-center">
            <img
              src="${qrCode}"
              alt="Ticket QR Code"
              class="h-[150px] w-[150px] object-contain"
            />
          </div>

          <!-- TICKET INFORMATION -->
          <div class="flex flex-col justify-center gap-6">

            <!-- Ticket Name -->
            <div class="flex flex-col gap-1">
              <span class="text-sm font-normal text-gray-800">
                Ticket Name
              </span>

              <span class="text-base font-bold text-gray-900">
                ${ticketCode}
              </span>
            </div>

            <!-- Customer Name -->
            <div class="flex flex-col gap-1">
              <span class="text-sm font-normal text-gray-800">
                Customer Name
              </span>

              <span class="text-base font-bold text-gray-900">
                ${ticketCode}
              </span>
            </div>

          </div>

        </div>

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