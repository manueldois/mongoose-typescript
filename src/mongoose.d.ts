import * as mongoose from 'mongoose'

export type Populated<M, K extends keyof M> =
    Omit<M, K> &
    {
        [P in K]: Exclude<M[K], mongoose.Types.ObjectId[]>
    }

export type UnPopulated<M, K extends keyof M> =
    Omit<M, K> &
    {
        [P in K]: Extract<M[K], mongoose.Types.ObjectId[]>
    }

