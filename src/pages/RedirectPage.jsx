import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import urlsApi from "../api/urls";

const RedirectPage = () => {
    const [loading,setLoading] = useState(true);
    const [error, setError] = useState('');
    const { identifier } = useParams();

    useEffect(() => {
        console.log('Component mounted');
        const fetchLink = async () => {
            setLoading(true);
            const result = await urlsApi.getUrl(identifier);
        
            if (result.ok && result.data.url) {
                if (!result.data.expired) {
                    setLoading(false);
                    window.location.href = result.data.url.original_link;
                } else {
                    setError('The link has expired');
                }
            } else {
                setError('Failed to fetch the link');
            }
        }
        fetchLink();
    }, []);

    return (
        <div>
            <div style={{ display: loading ? 'block' : 'none' }}>
               <Loader>{ error ? error : 'Loading your page......'}</Loader>
            </div>
        </div>
    )
}

export default RedirectPage;

const Loader = styled.span`
text-align: center;
font-size: 24px;
font-weight: bold;
display: block;
margin: 10px;
`