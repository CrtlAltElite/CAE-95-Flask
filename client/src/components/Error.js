import React from 'react'

export default function Error({children, style, ...props}) {

    const styles = {
        error:{
            color:"red"
        }
    }

  return (
    <div style={{ ...style,...styles.error}} {...props}>{children}</div>
  )
}
