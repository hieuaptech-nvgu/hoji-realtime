import { Document, Types } from 'mongoose'

export interface SessionDocument extends Document {
  userId: Types.ObjectId
  refreshToken: string
  expiredAt: Date
  createdAt: Date
  updatedAt: Date
}

export interface CreateSessionDTO {
  userId: string
  refreshToken: string
  expiredAt: Date
}
