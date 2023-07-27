import { FunctionComponent, useContext, useState } from "react";
import CompanyCard from "./CompanyCard";
import { UserContext } from "../../App";
import CCard from "../../interfaces/CCard";
import { useFormik } from "formik";
import * as yup from "yup";
import { patchCompanyCard } from "../../services/dbFunctions";

interface CompanyCardsProps {

}

const CompanyCards: FunctionComponent<CompanyCardsProps> = () => {
    const [userInfo, setUserInfo] = useContext(UserContext)
    const [isEditing, setIsEditing] = useState(false)

    let formik = useFormik({
        initialValues: {
            id: userInfo.companyCards.length,
            name: "",
            email: "",
            location: "",
            phone: ""
        },
        validationSchema: yup.object({
            name: yup.string().required(),
            email: yup.string().required().email(),
            location: yup.string().required(),
            phone: yup.string().required()
        }),
        onSubmit: (values: CCard) => {
            // split to two types - edit and new
            setIsEditing(false)
            const cardsData = userInfo.companyCards
            cardsData.splice(userInfo.companyCards.length, 0, values)
            patchCompanyCard(userInfo.id, cardsData)
        }
    })


    return (
        <div className="container row mb-3">
            {/* Display Cards */}
            {
                userInfo.companyCards.map((card: CCard) => {
                    return (
                        <CompanyCard cardNum={card.id} key={card.id} />
                    )
                })
            }

            {/* Add Card */}
            <div className="col-6">
                <div className="bg-body myBorder boxShadow p-4 ms-1 d-flex flex-column align-items-center justify-content-center" style={{ maxWidth: "38rem", minHeight: "20rem" }}>
                    {
                        isEditing ?
                            <form className="text-end" onSubmit={formik.handleSubmit}>
                                <div className="mb-2">
                                    <label htmlFor="name" className="me-3">Name:</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} />
                                    {
                                        formik.touched.name && formik.errors.name &&
                                        <p className="text-center m-0">{formik.errors.name as string}</p>
                                    }
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="email" className="me-3">Email:</label>
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} />
                                    {
                                        formik.touched.email && formik.errors.email &&
                                        <p className="text-center m-0">{formik.errors.email as string}</p>
                                    }
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="location" className="me-3">Location:</label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        value={formik.values.location}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} />
                                    {
                                        formik.touched.location && formik.errors.location &&
                                        <p className="text-center m-0">{formik.errors.location as string}</p>
                                    }
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="phone" className="me-3">Phone:</label>
                                    <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} />
                                    {
                                        formik.touched.phone && formik.errors.phone &&
                                        <p className="text-center m-0">{formik.errors.phone as string}</p>
                                    }
                                </div>

                                {/* Form Btns */}
                                <hr className="my-3" />
                                <div className="d-flex justify-content-center">
                                    {/* Cancel Btn */}
                                    <button type="button" className="me-3 btn btn-outline-secondary"
                                        onClick={() => {
                                            setIsEditing(false);
                                            formik.resetForm()
                                        }}>Cancel</button>
                                    {/* Create Btn */}
                                    <button type="submit" className="btn btn-outline-secondary" disabled={!formik.isValid && formik.dirty}>Create</button>
                                </div>
                            </form>
                            :
                            <div className="d-flex flex-column align-items-center justify-content-center">
                                <i className="fa-solid fa-circle-plus text-center mb-4" style={{ fontSize: "3rem", color: "#6C757D" }} onClick={() => setIsEditing(true)}></i>
                                <p>Create A New Company Card!</p>
                            </div>
                    }

                </div>
            </div>

        </div>

    );
}

export default CompanyCards;