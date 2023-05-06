import './Staff.scss'
import Interface from './parameters/Interface';

export default function Staff() {
    return (
        <div className="flex justify-evenly">
          <Interface />
          <div id="staff"></div>
        </div>
    );
}