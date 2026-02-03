import { Document } from 'mongoose'

export interface IUser extends Document {
  username: string
  hashedPassword: string
  email: string
  displayName: string

  avatarUrl?: string
  avatarId?: string
  bio?: string
  phone?: string

  createdAt: Date
  updatedAt: Date
}
