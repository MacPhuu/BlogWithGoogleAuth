import EditUserForm from './components/EditUserForm'
import LogOutButton from './components/LogOutButton'

const Settings = () => {
  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            <EditUserForm />
            <hr />
            <LogOutButton />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
