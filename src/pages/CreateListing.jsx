import {useState, useEffect, useRef} from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import {db} from '../firebase.config'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/layout/Spinner'
import {toast} from 'react-toastify'

function CreateListing() {
      // eslint-disable-next-line
    const [geolocationEnabled, setGeolocationEnabled] = useState(true)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        type: 'rent',
        name: '',
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furnished: false,
        address: '',
        offer: false,
        regularPrice: 0,
        discountedPrice: 0,
        images: {},
        latitude: 0,
        longitude: 0
    })

    const {type, name, bedrooms, bathrooms, parking, furnished, address, offer, regularPrice, discountedPrice, images, latitude, longitude} = formData


    const auth = getAuth()
    const navigate = useNavigate()
    const isMounted = useRef(true)

    useEffect(() => {
        if(isMounted) {
            onAuthStateChanged(auth, (user) => {
                if(user) {
                    setFormData({...formData, userRef: user.uid })
                } else {
                    navigate('/signin')
                }
            })
        }

        return () => {
            isMounted.current = false
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted])

    const onSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        if(discountedPrice >= regularPrice) {
        setLoading(false)
        toast.error('Discounted Price must be less than regular price')
        return
        }

        if (images.length > 6) {
            setLoading(false)
            toast.error('Max of 6 images can be uploaded')
            return
        }

        let geolocation = {}
        let location

        if(geolocationEnabled) {
            const mapApi = process.env.REACT_APP_MAP_API_KEY

            const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${mapApi}`)

            const data = await res.json()

            geolocation.lat = data.results[0]?.geometry.location.lat ?? 0

            geolocation.lng = data.results[0]?.geometry.location.lng ?? 0

            location = data.status === 'ZERO_REULTS' ? undefined : data.results[0]?.formatted_address

            if(location === undefined || location.includes('undefined')) {
                setLoading(false)
                toast.error('Please enter a correct address')
                return
            }
        } else {
            geolocation.lat = latitude
            geolocation.lng = longitude
        }
        //upload images in firebase
        const storeImage = async (image) => {
            return new Promise((resolve, reject) => {
                const storage = getStorage()

                const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`

                const storageRef = ref(storage, 'images/' + fileName)

                const uploadTask = uploadBytesResumable(storageRef, image)

                uploadTask.on('state_changed', 
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default: 
                        break;
                    }
                }, 
                (error) => {
                    reject(error)
                }, 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                    });
                }
                );
            })
        }

        const imageUrls = await Promise.all(
            [...images].map((image) => storeImage(image))).catch(() => {
                setLoading(false)
                toast.error('Images not uploaded')
                return
            })

        const formDataCopy = {
            ...formData,
            imageUrls,
            geolocation,
            timestamp: serverTimestamp()
        }

        formDataCopy.location = address
        delete formDataCopy.images
        delete formDataCopy.address
        !formDataCopy.offer && delete formDataCopy.discountedPrice

        const docRef = await addDoc(collection(db, 'listings'), formDataCopy)
        setLoading(false)
        toast.success('Your new listing has been added')
        navigate(`/category/${formDataCopy.type}/${docRef.id}`)
    }

    const onMutate = (e) => {
        let boolean = null

        if(e.target.value === 'true') {
            boolean = true
        }
        if(e.target.value === 'false') {
            boolean = false
        }

        //files
        if(e.target.files) {
            setFormData((prevState) => ({
                ...prevState, 
                images: e.target.files
            }))
        }

        //text/Booleans/Numbers
        if(!e.target.files) {
            setFormData((prevState) => ({
                ...prevState, 
                [e.target.id]: boolean ?? e.target.value,
            }))
        }
    }

    if(loading) {
        return <Spinner />
    }

  return (
    <div className="profile">
        <header>
            <p className="pageHeader">Create a Listing</p>
        </header>

        <main>
            <form onSubmit={onSubmit}>
                <label className="formLabel">Sell / Rent</label>
                <div className="formButtons">
                    <button type='button' className={type === 'sale' ? 'formButtonActive' : 'formButton'} id='type' value='sale' onClick={onMutate}>Sell</button>

                    <button type='button' className={type === 'rent' ? 'formButtonActive' : 'formButton'} id='type' value='rent' onClick={onMutate}>Rent</button>
                </div>

                <label className="formLabel">Name</label>
                <input type="text" className="formInputName" id='name' value={name} onChange={onMutate} maxLength='32' minLength='10' required />

                <div className="formRooms flex">
                    <div>
                        <label className="formLabel">Bedrooms</label>
                        <input type="number" className="formInputSmall" id='bedrooms' value={bedrooms} onChange={onMutate} min='1' max='50' required />
                    </div>
                    <div>
                        <label className="formLabel">Bathrooms</label>
                        <input type="number" className="formInputSmall" id='bathrooms' value={bathrooms} onChange={onMutate} min='1' max='50' required />
                    </div>
                </div>

                <label className="formLabel">Parking Spot</label>
                <div className="formButtons">
                    <button className={parking ? 'formButtonActive' : 'formButton'} type='button' id='parking' value={true} onClick={onMutate}>Yes</button>
                    <button className={!parking && parking !== null ? 'formButtonActive' : 'formButton'} type='button' id='parking' value={false} onClick={onMutate}>No</button>
                </div>

                <label className="formLabel">Furnished</label>
                <div className="formButtons">
                    <button className={furnished ? 'formButtonActive' : 'formButton'} type='button' id='furnished' value={true} onClick={onMutate}>
                        Yes
                    </button>
                    <button className={!furnished && furnished !== null ? 'formButtonActive' : 'formButton'} type='button' id='furnished' value={false} onClick={onMutate}>
                        No
                    </button>
                </div>

                <label className="formLabel">Address</label>
                <textarea className='formInputAddress' type='text' id='address' value={address} onChange={onMutate} required />

                {!geolocationEnabled && (
                    <div className="formLatLng flex">
                        <div>
                            <label className="formLabel">Latitude</label>
                            <input type="number" id='latitude' value={latitude} onChange={onMutate} className="formInputSmall" required />
                        </div>
                        <div>
                            <label className="formLabel">Longitude</label>
                            <input type="number" id='longitude' value={longitude} onChange={onMutate} className="formInputSmall" required />
                        </div>
                    </div>
                )}

                <label className="formLabel">Offer</label>
                <div className="formButtons">
                    <button className={offer ? 'formButtonActive' : 'formButton'} type='button' id='offer' value={true} onClick={onMutate}>
                        Yes
                    </button>
                    <button className={!offer && offer !== null ? 'formButtonActive' : 'formButton'} type='button' id='offer' value={false} onClick={onMutate}>
                        No
                    </button>
                </div>

                <label className="formLabel">Regular Price</label>
                <div className="formPriceDiv">
                    <input type="number" className="formInputSmall" id='regularPrice' value={regularPrice} onChange={onMutate} min='50' max='10000000' />
                    {type === 'rent' && (
                        <p className="formPrice">₦ / Month</p>
                    )}
                </div>

                {offer && (
                    <>
                        <label className="formLabel">Discounted Price</label>
                        <input type="number" className="formInputSmall" id='discountedPrice' value={discountedPrice} onChange={onMutate} min='50' max='10000000' required={offer} />
                    </>
                )}

                <label className="formLabel">Images</label>
                <p className="imagesInfo">The first image will be the cover (Max image upload - 6)</p>
                <input className="formInputFile" type="file" id='images' onChange={onMutate} max='6' accept='.jpg, .png, .jpeg' multiple required />
                
                <button type='submit' className="primaryButton createListingButton">Create Listing</button>

            </form>
        </main>
    </div>
  )
}

export default CreateListing
