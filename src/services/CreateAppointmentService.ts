import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

/**
 * A classe deve conter(em uma única responsabilidade):
 * - Recebimento da informações
 * - Tratativa de erros/excessões
 * - Acesso ao repositório
 */

// SOLID
// S-OLID: Single Responsability Principle
// SOLI-D: Dependency Invertion Principle

interface Request {
  provider: string;
  date: Date;
}

/**
 * Dependency Inversion (SOLID)
 */

// DRY: Don't repeat yourself

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ date, provider }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
