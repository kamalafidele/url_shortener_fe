import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import authStorage from "../auth/storage";
import Sidebar from "../components/Sidebar";
import DashboardTopNav from "../components/DashboardTopNav";
import jwtDecode from "jwt-decode";
import COLOR_PALETTE from "../constants/colors";
import AddUrl from "../modals/AddUrl";
import ClientContext from "../contexts/index";
import urlsApi from "../api/urls";

function UrlsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = authStorage.getToken();
  const user = jwtDecode(token);

  const closeModal = () => {
    console.log('triggered');
    setIsOpen(false);
  };

  const fetchUrls = async () => {
    setLoading(true);
    const result = await urlsApi.getAllUrls();
    setLoading(false);

    if (result.ok) setUrls(result.data.urls);
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const copyLink = (link) => {
    navigator.clipboard.writeText(link)
    toast.success('Link copied', { position: 'bottom-right', autoClose: 2000 });
  }

  const deleteUrl = async (url) => {
    const remaining = urls.filter((u) => u._id !== url._id);
    await urlsApi.deleteUrl(url._id);
    setUrls(remaining);
  }

  return (
    <ClientContext.Provider value={{ urls, setUrls }}>
      <Container>
        <Sidebar />
        <ToastContainer/>
        <Wrapper>
          <DashboardTopNav user={user} title={"URLs"} />
          <Content>
            <div className="add-new">
              <div>
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    textAlign: "left",
                  }}
                >
                  New URL
                </span>
              </div>
              <div className="add-client">
                <span style={{ color: COLOR_PALETTE.GRAY }}>
                  Shorten a new URL
                </span>
                <i
                  className="fa-solid fa-plus"
                  onClick={() => setIsOpen(true)}
                ></i>
              </div>
            </div>

            <AddUrl closeModal={closeModal} isOpen={isOpen} />

            <div className="table-container">
              <div className="table-top">
                <h3>All URLS</h3>
                <div className="icons-container">
                  <div>
                    <i className="fa-sharp fa-solid fa-sort"></i>
                    <span>Sort</span>
                  </div>
                  <div>
                    <i className="fa-solid fa-filter"></i>
                    <span>Filter</span>
                  </div>
                </div>
              </div>

              <div className="table">
                {loading ? (
                  <Loader>Loading URLs......</Loader>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <th>Original URL</th>
                        <th>Clicks</th>
                        <th>Shareable Link</th>
                        <th>Expiration Date</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {urls.map((shortenedUrl, index) => (
                        <tr key={index}>
                          <td>{shortenedUrl.original_link.substring(0, 30) + '....'}</td>
                          <td>{shortenedUrl.clicks}</td>
                          <td>
                            <button onClick={() => copyLink(shortenedUrl.shareable_link)}>{shortenedUrl.shareable_link}</button>
                          </td>
                          <td>
                            <span
                              style={{
                                background: COLOR_PALETTE.LIGHT_DARK,
                                color: COLOR_PALETTE.WHITE,
                                padding: 4,
                                borderRadius: 15,
                              }}
                            >
                              {new Date(shortenedUrl.expirationDate).toDateString()}
                            </span>
                          </td>
                          <td>
                            <i
                              className="fa-solid fa-trash"
                              style={{ cursor: "pointer", color: 'red' }}
                              onClick = {() => deleteUrl(shortenedUrl)}
                            ></i>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </Content>
        </Wrapper>
      </Container>
    </ClientContext.Provider>
  );
}

const Container = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  background-color: ${COLOR_PALETTE.LIGHT};
`;

const Wrapper = styled.div`
  width: 80%;
  margin-left: 20%;
  padding: 10px;
`;

const Content = styled.div`
  .add-new {
    display: flex;
    flex-direction: column;
    align-items: center;
    div {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      width: 30%;
      padding: 10px;
      i {
        cursor: pointer;
        background-color: ${COLOR_PALETTE.GRAY};
        padding: 5px;
        border-radius: 15px;
        color: ${COLOR_PALETTE.LIGHT};
      }
    }

    .add-client {
      border-bottom: 2px solid ${COLOR_PALETTE.GRAY};
    }
  }

  .table-container {
    background-color: ${COLOR_PALETTE.WHITE};
    border: 2px solid ${COLOR_PALETTE.GRAY};
    border-radius: 5px;
    margin-top: 20px;

    div.table-top {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      div.icons-container {
        display: flex;
        div {
          margin-left: 20px;
          span {
            margin-left: 5px;
          }
          i {
            cursor: pointer;
          }
        }
      }
    }

    div.table {
      table {
        border-collapse: collapse;
        width: 100%;
        th,
        td {
          padding: 15px;
          width: 25%;
          color: ${COLOR_PALETTE.GRAY};
          text-align: left;
          border-bottom: 2px solid ${COLOR_PALETTE.GRAY};
          font-weight: bold;
        }
        td {
          color: ${COLOR_PALETTE.BLACK};
          button {
            cursor: pointer;
            border-radius: 5px;
            border: none;
            color: ${COLOR_PALETTE.PRIMARY};
            background: white;
          }
        }
        th:nth-child(1) {
          padding: 3px;
        }
      }
    }
  }
`;
const Loader = styled.span`
text-align: center;
font-size: 24px;
font-weight: bold;
display: block;
margin: 10px;
`
export default UrlsPage;
