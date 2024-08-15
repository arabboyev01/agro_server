import { CorsOptions } from 'cors'

const whitelist = ['http://localhost:3000', 'https://spaceagro.uz', 'https://admin.spaceagro.uz']

export const corsOptions: CorsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allowed?: boolean) => void): void {
    if (origin) {
      if (whitelist.indexOf(origin as string) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  },
}
