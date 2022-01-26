import styled, { keyframes } from "@emotion/styled/types/base";

const keyFrameLoading = keyframes`
0% {
    opacity: 0.5;
}
100% {
    opacity: 1;
}
`;

const LoadingSkeleton = styled.div`
backgroun-color: grey;
border-radius: 6px;
margin-bottom: 10px;
min-width: ${(props) => props.width};
height: ${(props) => props.height};
animation: ${keyFrameLoading} 500ms infinite alternate;
`;

export default ({ width, height }) => <LoadingSkeleton width={width} height={height} />;

