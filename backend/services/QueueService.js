import Queue from '../models/queue.model.js'
import Service from '../models/service.model.js'
import Feedback from '../models/feedback.model.js'
import ErrorController from '../controllers/ErrorController.js'

class QueueService {

  async verifyQueue(code) {
    const queue = await Queue.findOne({ code })

    if (!queue) {
      throw new ErrorController('Invalid Queue Ticket', 401)
    }

    if (queue.status === "used") {
      throw new ErrorController('This ticket has already been used.', 409)
    }

    const officeCode = code.match(/^(.+?)\d{2}-[A-Z2-9]{6}$/)?.[1]
    if (!officeCode) {
      throw new ErrorController('Invalid Queue Ticket', 401)
    }

    const services = await Service.find({ officeCode }).select('code name')
    return { exists: true, officeCode, services }
  }

  async saveFeedback(formData, queueNumber) {
    const isExist = await Queue.findOne({ code: queueNumber });

    if (!isExist) {
      throw new ErrorController("Invalid Queue Ticket", 401);
    }
    if (isExist.status === "used") {
      throw new ErrorController("Feedback already submitted", 409);
    }
    if (isExist.status === "expired") {
      throw new ErrorController("Expired Queue Ticket", 401);
    }
    if (!isExist.officeCode) {
      throw new ErrorController("No Office Code Found", 404)
    }

    const extractedOfficeCode = isExist.officeCode;

    const requiredRatingKeys = [
      "responsiveness", "reliability", "accessFacilities",
      "communication", "costs", "integrity", "assurance", "outcome",
    ];

    for (const k of requiredRatingKeys) {
      const v = Number(formData[k]);
      if (!Number.isInteger(v) || v < 1 || v > 5) {
        throw new ErrorController(`Invalid rating: ${k}`, 400);
      }
    }

    const feedback = new Feedback({
      officeCode: extractedOfficeCode,
      queueNumber,
      service: formData.service,
      client: {
        name: formData.clientName?.trim() || "NA",
        contactNumber: formData.contactNumber?.trim() || "NA",
        gender: formData.gender,
        affiliation: formData.affiliation,
        ageGroup: formData.ageGroup,
        employmentStatus: formData.employmentStatus,
        address: formData.address,
        barangay: formData.barangay || undefined,
        region: formData.region || undefined,
        province: formData.province || undefined,
        municipality: formData.municipality || undefined,
        addressDetail: formData.addressDetail || undefined,
      },
      ratings: {
        responsiveness: Number(formData.responsiveness),
        reliability: Number(formData.reliability),
        accessFacilities: Number(formData.accessFacilities),
        communication: Number(formData.communication),
        costs: Number(formData.costs),
        integrity: Number(formData.integrity),
        assurance: Number(formData.assurance),
        outcome: Number(formData.outcome),
      },
      comments: formData.comments?.trim() || "NA",
    });

    await feedback.save();
    await Queue.updateOne({ code: queueNumber }, { status: "used" });

    const officeCode = queueNumber.match(/^(.+?)\d{2}-[A-Z2-9]{6}$/)?.[1]
    if (global.io && officeCode) {
      global.io.to(`office:${officeCode}`).emit('ticket:used', { queueNumber, officeCode })
    }

    return { success: true, queueNumber };
  }
  
}

export default new QueueService()