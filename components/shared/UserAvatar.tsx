'use client'
import { AVATAR_GRADIENTS } from '@/lib/colors'
import { initials } from '@/lib/utils'
import { AvatarRoot } from './UserAvatar.styled'

type Size = 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

interface Props {
  name: string
  color?: number
  size?: Size
}

export default function UserAvatar({ name, color = 1, size = 'md' }: Props) {
  return (
    <AvatarRoot $gradient={AVATAR_GRADIENTS[color] ?? AVATAR_GRADIENTS[1]} $size={size}>
      {initials(name)}
    </AvatarRoot>
  )
}
