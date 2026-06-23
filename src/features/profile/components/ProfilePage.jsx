// [Member 3 - Profile] Composes the profile card + edit form.
import PageHeader from '../../../components/common/PageHeader'
import Loader from '../../../components/ui/Loader'
import ProfileCard from './ProfileCard'
import ProfileForm from './ProfileForm'
import { useProfile } from '../hooks/useProfile'

export default function ProfilePage() {
  const { profile, loading, error, save } = useProfile()

  if (loading) {
    return (
      <div className="grid place-items-center py-20">
        <Loader label="Loading profile…" />
      </div>
    )
  }

  return (
    <div className="max-w-2xl">
      <PageHeader title="My profile" subtitle="View and update your account." />
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      )}
      <div className="flex flex-col gap-6">
        <ProfileCard profile={profile} />
        <ProfileForm profile={profile} onSave={save} />
      </div>
    </div>
  )
}
