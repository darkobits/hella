// import HashIds from 'hashids';
import { v4, v5 } from 'uuid';

/**
 * @private
 *
 * Namespace to use for generated V5 UUIDs.
 */
const NAMESPACE = 'e51fd31b-8853-4599-90ca-aa651c9c4d8f';


export default {
  getRandom: () => v4(),
  getFor: (input: any) => v5(String(input), NAMESPACE)
};
