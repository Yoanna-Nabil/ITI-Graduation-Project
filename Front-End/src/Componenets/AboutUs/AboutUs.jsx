import React from 'react';
import img from '../../Assets/aboutus.png';
import img1 from '../../Assets/about.png';
import imgTeam1 from '../../Assets/msg3.jpg'
import imgTeam2 from '../../Assets/photo.png'
import imgTeam3 from '../../Assets/msg1.jpg'
import imgTeam4 from '../../Assets/msg2.jpg'
import imgTeam5 from '../../Assets/WhatsApp Image 2024-07-07 at 09.44.18_b5a0f14f.jpg'
import imgTeam6 from '../../Assets/WhatsApp2.jpg'
import styles from '../AboutUs/AboutUs.module.css'

export default function AboutUs() {
  return (
    <div className="w-[95%] mx-auto mt-3 mb-5">
      <div
        className={`d-flex justify-content-between align-items-center ${styles.section}`}
      >
        <div className={`w-50 ${styles.about_text}`}>
          <img src={img1} alt="" className="w-60 text-align-center" />
          <p className={`w-75 ${styles.para}`}>
            TechnoCore is positioned as a comprehensive e-commerce solution that
            meets the needs of both consumers and sellers. By focusing on user
            experience, security, and efficient service delivery, TechnoCore
            aims to become a preferred online shopping destination. Whether
            you're looking to purchase everyday items or special products,
            TechnoCore provides a reliable and enjoyable shopping experience.
          </p>
          <h5 className="mt-4 fs-3 text-danger">Team Members</h5>
          <div className="ourTeams d-flex mt-4" style={{ width: "40%" }}>
            <div className="me-2">
              <img
                src={imgTeam1}
                alt=""
                className={`${styles.imges} rounded-circle `}
              />
            </div>
            <div className="me-2">
              <img
                src={imgTeam2}
                alt=""
                className={`${styles.imges} rounded-circle `}
              />
            </div>
            <div className="me-2">
              <img
                src={imgTeam3}
                alt=""
                className={`${styles.imges} rounded-circle `}
              />
            </div>
            <div className="me-2">
              <img
                src={imgTeam4}
                alt=""
                className={`${styles.imges} rounded-circle `}
              />
            </div>
            <div className="me-2">
              <img
                src={imgTeam5}
                alt=""
                className={`${styles.imges} rounded-circle`}
              />
            </div>
            <div className="me-2">
              <img
                src={imgTeam6}
                alt=""
                className={`${styles.imges} rounded-circle  `}
              />
            </div>
          </div>
        </div>
        <div className="w-50">
          <img src={img} alt="" className="w-100" />
        </div>
      </div>
    </div>
  );
}
