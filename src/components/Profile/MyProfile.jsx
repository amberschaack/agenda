import { useScript } from '../../hooks/useScript';

export default function MyProfile() {

    const openWidget = () => {
        // Currently there is a bug with the Cloudinary <Widget /> component
        // where the button defaults to a non type="button" which causes the form
        // to submit when clicked. So for now just using the standard widget that
        // is available on window.cloudinary
        // See docs: https://cloudinary.com/documentation/upload_widget#look_and_feel_customization
        !!window.cloudinary && window.cloudinary.createUploadWidget(
           {
              sources: ['local', 'url', 'camera'],
              cloudName: 'dz2bil44j',
              uploadPreset: 'hl5wdxak'
           },
           (error, result) => {
              if (!error && result && result.event === "success") {
                 // When an upload is successful, save the uploaded URL to local state!
                 setNewGroup({
                    ...newGroup,
                    logo: result.info.secure_url
                 })
              }
           },
        ).open();
     }

    return (
        <div className="container">
            <h1>My Profile</h1>
            <h3>Edit Profile Picture</h3>
            { /* This just sets up the window.cloudinary widget */ }
                    {useScript('https://widget.cloudinary.com/v2.0/global/all.js')}

                    File to upload: <button type="button" onClick={openWidget}>Pick File</button>
                    <br />
        </div>
    )
}