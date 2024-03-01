export class RegisteredCourses implements IRegisteredCourses {
  email: string;
  inscriptions: IInscription[];
  people: IPeople;
  constructor(email: string = '', inscriptions: IInscription[] = [], people: IPeople = { lastName: '', name: '' }) {
    this.email = email;
    this.inscriptions = inscriptions;
    this.people = people;
  }
}

export interface IRegisteredCourses {
  email: string
  people: IPeople
  inscriptions: IInscription[]
}

export interface IPeople {
  name: string
  lastName: string
}

export interface IInscription {
  courseId: number
  inscripcionDate: string
  certificationDate: string
  advance: number
  scoreCourse: number
  folioCertificate: string
  anyTest: boolean
  course: ICourse
  reactionId?: number
}

export interface ICourse {
  name: string
  imageUrl: string
  sector: ISector
}

export interface ISector {
  id: number
  name: string
  colorTheme: string
}
