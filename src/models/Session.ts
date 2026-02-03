import mongoose from 'mongoose'
import { SessionDocument } from '~/types/session.type.js'

const sessionSchema = new mongoose.Schema<SessionDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    refreshToken: {
      type: String,
      required: true,
      unique: true,
    },
    expiredAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

export default mongoose.model<SessionDocument>('Session', sessionSchema)
