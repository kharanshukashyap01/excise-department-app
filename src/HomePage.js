import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "./images/logo.png";
import "./HomePage.css";
import LiquorSalesAnalysis from "./images/LiquorSalesAnalysis.png";
import LiquorRevenueAnalysis from "./images/LiquorRevenueAnalysis.png";
import LiquorProductionAnalysis from "./images/LiquorProductionAnalysis.png";
import ShopSaleAnalysis from "./images/ShopSaleAnalysis.png";
import LiquorSupplyAnalysis from "./images/LiquorSupplyAnalysis.png";
import SalesPredictionAnalysis from "./images/SalesPredictionAnalysis.png";
import GuaranteeAnalysis from "./images/GuaranteeAnalysis.png";
import SalesvsStockanalysis from "./images/SalesvsStockanalysis.png";
import DepotStockAnalysis from "./images/DepotStockAnalysis.png";
import ShopStatus from "./images/ShopStatus.png";
import WhatifAnalysis from "./images/WhatifAnalysis.png";
import Chatbot from "./images/Chatbot.png";

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state?.id;
  const [activeViz, setActiveViz] = useState(null);
  const [roles, setRoles] = useState([]);
  const [links, setLinks] = useState({});

  useEffect(() => {
    if (!id) {
      navigate("/login");
      return;
    }

    fetchRolesAndLinks(id);

    if (activeViz) {
      // Inject the Tableau script dynamically
      const script = document.createElement("script");
      script.src =
        "https://va.rajasthan.gov.in/javascripts/api/tableau.embedding.3.latest.min.js";
      script.type = "module";
      script.async = true;
      document.body.appendChild(script);

      // Inject the tableau-viz element
      const vizContainer = document.getElementById("vizContainer");
      vizContainer.innerHTML = `<tableau-viz id='tableau-viz' src='${activeViz}' width='1366' height='3340' hide-tabs toolbar='bottom' ></tableau-viz>`;

      return () => {
        document.body.removeChild(script);
        vizContainer.innerHTML = "";
      };
    }
  }, [id, activeViz, navigate]);

  const fetchToken = async (userId) => {
    try {
      const user_id = parseInt(userId, 10);
      const response = await fetch("http://127.0.0.1:5000/api/latest-token/3");
      if (response.ok) {
        const data = await response.json();
        return data.token;
      } else {
        console.error("Failed to fetch token");
      }
    } catch (error) {
      console.error("Error fetching token:", error);
    }
    return null;
  };

  const fetchRolesAndLinks = async (userId) => {
    try {
      const token = await fetchToken(userId);
      if (token) {
        const rolesResponse = await fetch(
          `http://127.0.0.1:5000/api/users/${userId}/roles`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (rolesResponse.ok) {
          const rolesData = await rolesResponse.json();
          let rolesArray = [];

          if (Array.isArray(rolesData.roles)) {
            rolesArray = rolesData.roles.flatMap((role) =>
              role.split(",").map((r) => r.trim())
            );
          } else if (typeof rolesData.roles === "string") {
            rolesArray = rolesData.roles.split(",").map((r) => r.trim());
          }

          setRoles(rolesArray);

          const linksResponse = await fetch(
            `http://127.0.0.1:5000/api/roles-links/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (linksResponse.ok) {
            const linksData = await linksResponse.json();
            setLinks(linksData);
          } else {
            console.error("Failed to fetch links");
          }
        } else {
          console.error("Failed to fetch roles");
        }
      }
    } catch (error) {
      console.error("Error fetching roles and links:", error);
    }
  };

  const images = [
    {
      id: "LiquorSalesAnalysis",
      src: LiquorSalesAnalysis,
      alt: "Liquor Sales Analysis",
    },
    {
      id: "LiquorRevenueAnalysis",
      src: LiquorRevenueAnalysis,
      alt: "Liquor Revenue Analysis",
    },
    {
      id: "LiquorProductionAnalysis",
      src: LiquorProductionAnalysis,
      alt: "Liquor Production Analysis",
    },
    {
      id: "ShopSaleAnalysis",
      src: ShopSaleAnalysis,
      alt: "Shop Sale Analysis",
    },
    {
      id: "LiquorSupplyAnalysis",
      src: LiquorSupplyAnalysis,
      alt: "Liquor Supply Analysis",
    },
    {
      id: "SalesPredictionAnalysis",
      src: SalesPredictionAnalysis,
      alt: "Sales Prediction Analysis",
    },
    {
      id: "GuaranteeAnalysis",
      src: GuaranteeAnalysis,
      alt: "Guarantee Analysis",
    },
    {
      id: "SalesvsStockanalysis",
      src: SalesvsStockanalysis,
      alt: "Sales vs Stock Analysis",
    },
    {
      id: "DepotStockAnalysis",
      src: DepotStockAnalysis,
      alt: "Depot Stock Analysis",
    },
    { id: "ShopStatus", src: ShopStatus, alt: "Shop Status" },
    {
      id: "WhatifAnalysis",
      src: WhatifAnalysis,
      alt: "What if Analysis",
    },
    { id: "Chatbot", src: Chatbot, alt: "Chatbot" },
  ];

  const filteredImages = images.filter((image) => roles.includes(image.id));

  const handleImageClick = (link) => {
    setActiveViz(link);
  };

  const handleCloseViz = () => {
    setActiveViz(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <header className="header">
        <div className="header-left">
          राजस्थान सरकार | GOVERNMENT OF RAJASTHAN
        </div>
        <div className="header-right">
          SKIP TO MAIN CONTENT | SCREEN READER ACCESS
        </div>
      </header>
      <div className="image-container">
        <img src={logo} alt="Logo" className="header-image" />
      </div>
      <nav className="navbar">
        <button className="nav-button">Home</button>
        <button className="nav-button">About Us</button>
        <button className="nav-button">Directory</button>
        <button className="nav-button">Contact Us</button>
        <button className="nav-button" onClick={handleLogout}>
          Logout
        </button>
        <button className="nav-button">Recruitment</button>
        <button className="nav-button">Administration Dashboard</button>
        <button className="nav-button">Mobile App</button>
        <button className="nav-button">Analytic Dashboard</button>
      </nav>

      <div className="liquor-sales-analysis">
        <h2 style={{ textAlign: "left" }}>Liquor Sales Analysis</h2>
        {activeViz ? (
          <div className="tableau-viz-container">
            <button className="close-button" onClick={handleCloseViz}>
              Close
            </button>
            <div id="vizContainer" style={{ width: "100%", height: "800px" }}>
              {/* The tableau-viz element will be dynamically inserted here */}
            </div>
          </div>
        ) : (
          <div className="image-grid">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className={`image-item ${
                  index === images.length - 1 ? "align-left" : ""
                }`}
              >
                {links[image.id] ? (
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="clickable-image"
                    onClick={() =>
                      handleImageClick(
                        `https://va.rajasthan.gov.in/views${links[image.id]}`
                      )
                    }
                  />
                ) : (
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="clickable-image"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
