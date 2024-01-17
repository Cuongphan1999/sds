import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { FaSave, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
const schema = yup.object({
    fullname: yup.string().required(),
    dob: yup.date().required().typeError('dob is a required field'),
    mobile: yup.string().required(),
    gender: yup.bool().required(),
    email: yup.string().email().required(),
    department: yup.string().required(),
    avatarUrl: yup.string().url().required()
})
export default function ModifyStudentModal({ show, handleClose, studentId }) {
  const [currentStudent, setCurrentStudent] = useState({});
  const [loading, setLoading] = useState(false)
  const [departmentList, setDepartmentList] = useState([])
  const [newAvatarUrl, setNewAvatarUrl] = useState(null)

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
})
  useEffect(() => {
    setLoading(true)
    async function getStudentById() {
      let currentStudentRes = await fetch(
        `https://6596b23a6bb4ec36ca0329d0.mockapi.io/student/${studentId}`,
        { method: "GET" }
      );
      let data = await currentStudentRes.json();
      setCurrentStudent(data);
      setValue('fullname', data?.fullname)
      setValue('mobile', data?.mobile)
      setValue('dob', dayjs.data?.dob.format('YYYY-MM-DD'))
      setValue('email', data?.email)
      setValue('department',JSON.stringify(data?.department))
      setValue('avatarUrl', data?.avatarUrl)
      setValue('gender', Boolean(data?.gender))
      setLoading(false)
    }
    getStudentById();
  }, [studentId]);
  useEffect(() => {
    async function getDepartmentList() {
        let departmentListRes = await fetch('https://6596b23a6bb4ec36ca0329d0.mockapi.io/department')
        let data = await departmentListRes.json()
        setDepartmentList(data)
    }
    getDepartmentList()
}, [])
const handleCloseModel = () => {
    handleClose(false) // close avatar
    setNewAvatarUrl(null)
}
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      size={"xl"}
    >
      <Modal.Header closeButton>
        <Modal.Title>Modify {currentStudent?.fullname}'s infor</Modal.Title>
      </Modal.Header>
      <form>
        <Modal.Body>
          {
            loading ? <p>Loading...</p> : (
                <div className="row">
            <div className="col-md-5 col-lg-5 col-sm-12">
              <div className="form-group mb-2">
                <label className="form-label">Fullname</label>
                <input
                  type="text"
                  className={`${
                    errors.fullname?.message ? "is-invalid" : ""
                  } form-control`}
                  placeholder="Fullname..."
                  {...register("fullname")}
                />
                <span className="invalid-feedback">
                  {errors.fullname?.message}
                </span>
              </div>
              <div className="form-group mb-2">
                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label">Date of birth</label>
                    <input
                      type="date"
                      className={`${
                        errors.dob?.message ? "is-invalid" : ""
                      } form-control`}
                      {...register("dob")}
                    />
                    <span className="invalid-feedback">
                      {errors.dob?.message}
                    </span>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Gender</label>
                    <div>
                      {Boolean(currentStudent?.gender) ? ( //gender
                        <>
                          <div className="form-check form-check-inline">
                            <input
                              type="radio"
                              className={`${
                                errors.gender?.message ? "is-invalid" : ""
                              } form-check-input`}
                              value={true}
                              {...register("gender")}
                              checked //check true
                            />
                            <label className="form-check-label">Male</label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              type="radio"
                              className={`${
                                errors.gender?.message ? "is-invalid" : ""
                              } form-check-input`}
                              value={false}
                              {...register("gender")}
                            />
                            <label className="form-check-label">Female</label>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="form-check form-check-inline">
                            <input
                              type="radio"
                              className={`${
                                errors.gender?.message ? "is-invalid" : ""
                              } form-check-input`}
                              value={true}
                              {...register("gender")}
                            />
                            <label className="form-check-label">Male</label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              type="radio"
                              className={`${
                                errors.gender?.message ? "is-invalid" : ""
                              } form-check-input`}
                              value={false}
                              {...register("gender")}
                              checked
                            />
                            <label className="form-check-label">Female</label>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Mobile</label>
                <input
                  type="tel"
                  className={`${
                    errors.mobile?.message ? "is-invalid" : ""
                  } form-control`}
                  placeholder="Fullname..."
                  {...register("mobile")}
                />
                <span className="invalid-feedback">
                  {errors.mobile?.message}
                </span>
              </div>
            </div>
            <div className="col-md-4 col-lg-4 col-sm-12">
              <div className="form-group mb-2">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className={`${
                    errors.email?.message ? "is-invalid" : ""
                  } form-control`}
                  placeholder="Email..."
                  {...register("email")}
                />
                <span className="invalid-feedback">
                  {errors.email?.message}
                </span>
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Department</label>
                <select
                  className="form-select"
                  defaultValue={""}
                  {...register("department")}
                >
                  {departmentList?.map((depart) => (
                    <option value={JSON.stringify(depart)} key={depart.id}>
                      {depart.name}
                    </option>
                  ))}
                </select>
                <span className="invalid-feedback">
                  {errors.department?.message}
                </span>
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Avatar URL</label>
                <input
                  type="url"
                  className={`${
                    errors.avatarUrl?.message ? "is-invalid" : ""
                  } form-control`}
                  placeholder="Avatar URL..."
                  {...register("avatarUrl")}
                  onChange={(e) => setNewAvatarUrl(e.target.value)} //thay doi cap nhat state bag du lieu moi 
                />
                <span className="invalid-feedback">
                  {errors.avatarUrl?.message}
                </span>
              </div>
            </div>
            <div className="col-md-3 col-lg-3 col-sm-12">
              <img
                className="w-100 rounded"
                src={newAvatarUrl || currentStudent?.avatarUrl} //neu avatar co du lieu thi lay k thi thoi
                alt=""
              />
            </div>
          </div>
            )
          }
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-dark d-flex align-items-center" onClick={handleCloseModel}>
            <FaTimes className=" me-2"/>
            Close
          </button>
          <button type="submit" className="btn btn-primary d-flex align-items-center">
            <FaSave className="me-2 "/>
            Save
            </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
