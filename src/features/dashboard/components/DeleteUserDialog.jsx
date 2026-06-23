// [Member 2 - Dashboard] Confirm-before-delete dialog.
import { useState } from 'react'
import Modal from '../../../components/ui/Modal'
import Button from '../../../components/ui/Button'
import { getErrorMessage } from '../../../services/api/axios'

export default function DeleteUserDialog({ open, user, onClose, onConfirm }) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const confirm = async () => {
    setSubmitting(true)
    setError(null)
    try {
      await onConfirm(user.id)
      onClose()
    } catch (err) {
      setError(getErrorMessage(err, 'Could not delete user.'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Delete user"
      size="sm"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirm} loading={submitting}>
            Delete
          </Button>
        </>
      }
    >
      {error && (
        <div className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      )}
      <p className="text-sm text-slate-600 dark:text-slate-300">
        Delete <span className="font-semibold">{user?.name}</span> ({user?.email})?
        This can’t be undone.
      </p>
    </Modal>
  )
}