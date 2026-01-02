import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const customTwMerge = extendTailwindMerge<'typography'>({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: ['h1', 'h2', 'h3', 'h4', 'large', 'lead', 'list', 'small', 'muted', 'p', 'body'],
        },
      ],
    },
  },
})

export const cn = (...inputs: ClassValue[]) => {
  return customTwMerge(clsx(inputs))
}
