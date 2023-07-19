import loaderSvg from '@/assets/icons/loader.svg'

const PageLoader = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#FFF',
        width: '100%',
        height: '100%',
      }}
    >
      <img src={loaderSvg} />
    </div>
  )
}

export default PageLoader
