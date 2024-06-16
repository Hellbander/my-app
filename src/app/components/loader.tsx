import Image from 'next/image';

const Loader = () => (
  <div className='flex w-full h-screen justify-center align-middle'>
    <Image src='/loading.svg' alt={''} width={200} height={200} ></Image>
  </div>
)

export default Loader