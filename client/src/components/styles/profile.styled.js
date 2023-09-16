import styled from "styled-components";

export const StyledProfile = styled.div`
    display: flex;
    flex-wrap: wrap;
    

    h1 {
        flex-basis: 100%;
        width: 100%;
        text-align: center;
        color: ${({ theme }) => theme.colors.header};
    }
`;

export const StyledProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    margin: 5px auto;
    border-radius: 5px;
`;

export const StyledProfileEventContainer = styled.div`
    align-items: center;
    margin: 0 auto;
    max-width: 70%;
`;


