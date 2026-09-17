import { useState } from 'react';
import { CSFCustomToaster } from '../utils/Toaster';
import { useTicketToQrConversion } from './useTicketToQrConversion';

export const useGenerateTicket = (closeModal: () => void) => {
  const [isGeneratingTicket, setIsGeneratingTicket] = useState<boolean>(false)
  const { convertToQuickResponseCode } = useTicketToQrConversion()

  const createNewTicket = async (count: number, selectedService: string) => {
    setIsGeneratingTicket(true)
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/generate-ticket`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ count: Math.max(count, 1), selectedService })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.error(data);
        return;
      }
      convertToQuickResponseCode(data)
      closeModal()
      CSFCustomToaster.success('Generated Ticket')
    } catch (err) {
      console.error("Generate ticket failed:", err);
    } finally {
      setIsGeneratingTicket(false)
    }
  };

  return { createNewTicket, isGeneratingTicket };
};