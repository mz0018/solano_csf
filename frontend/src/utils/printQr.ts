export const printQr = (
  qrCode: string,
  ticketCode: string,
  officeCode: string
) => {
  const printWindow = window.open("", "_blank", "width=500,height=300")

  if (!printWindow) return

  printWindow.document.write(`
    <html>
      <head>
        <title>Ticket ${ticketCode}</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>

      <body class="m-0 bg-gray-100 p-4 font-sans">

        <!-- QUEUE TICKET -->
        <div class="mx-auto w-full max-w-[460px] overflow-hidden rounded-xl bg-white shadow-md">

          <!-- HEADER -->
          <div class="border-b-2 border-dashed border-gray-300 px-6 py-4 text-center">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Queue Ticket
            </p>

            <p class="mt-1 text-sm font-medium text-gray-700">
              Please use this ticket to provide your feedback.
            </p>
          </div>

          <!-- MAIN CONTENT -->
          <div class="flex items-center gap-6 px-6 py-6">

            <!-- QR CODE -->
            <div class="flex h-[140px] w-[140px] shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2">
              <img
                src="${qrCode}"
                alt="Ticket QR Code"
                class="h-full w-full object-contain"
              />
            </div>

            <!-- TICKET INFORMATION -->
            <div class="min-w-0 flex-1 text-start">

              <!-- TICKET CODE -->
              <div class="mb-2">
                <p class="text-xs font-semibold uppercase tracking-widest text-gray-500">
                  Ticket Number
                </p>

                <p class="mt-1 break-words text-base font-black tracking-wide text-gray-900">
                  ${ticketCode}
                </p>
              </div>

              <!-- OFFICE -->
              <div>
                <p class="text-xs font-semibold uppercase tracking-widest text-gray-500">
                  Office
                </p>

                <p class="mt-1 break-words text-base font-bold text-gray-900">
                  ${officeCode}
                </p>
              </div>

            </div>
          </div>

          <!-- FOOTER -->
          <div class="border-t-2 border-dashed border-gray-300 px-6 py-3 text-center">
            <p class="text-xs font-medium text-gray-500">
              Thank you for using our service. Please use this ticket to provide your feedback.
            </p>
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

