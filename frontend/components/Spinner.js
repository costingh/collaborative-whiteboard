import { css } from "@emotion/react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import styles from '../styles/Spinner.module.scss';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Spinner({color, loading}) {
  return (
    <div className={styles.spinner}>
        <div className="sweet-loading">
            <ClimbingBoxLoader color={color} loading={loading} css={override} size={15} />
        </div>
    </div>
  );
}

export default Spinner;