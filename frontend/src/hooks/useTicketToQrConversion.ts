import QRCode from "qrcode"

type Ticket = {
  code: string;
  createdAt: string;
  generatedBy: string;
  officeCode: string;
  selectedService: string[];
  status: string;
  updatedAt: string;
  _id: string;
  otherServiceDetail?: string | null;
};

export type TicketResponse = {
  qrCode: string
  ticket: Ticket[];
};

export const useTicketToQrConversion = () => {

  const convertToQuickResponseCode = async (data: TicketResponse) => {
    try {
        const qrCodes = await Promise.all(
            data.ticket.map(async (ticket) => {
            const ticketData = JSON.stringify(ticket);

            const qrCode = await QRCode.toDataURL(ticketData);

            return {
                ticket,
                qrCode,
            };
            })
        );

        return qrCodes
    } catch (err) {
        console.log('Something went wrong while converting ticket to qr. ', err)
    }
  };

  return { convertToQuickResponseCode };
};
