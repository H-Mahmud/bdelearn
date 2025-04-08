import React from 'react'

import { VerificationGuard } from 'src/auth/guard/verification-guard'

import VerificationForm from './verification-form'

export default function page() {
  return (
    <VerificationGuard>
      <VerificationForm />
    </VerificationGuard>
  )
}
