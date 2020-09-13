import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getData } from '../../store/actions'
import Loader from '../../components/Loader/Loader'
import Error from '../../components/Error/Error'
import { FetchDataType, DispatchType } from '../../utils/declarations'
import { RootState } from '../../store/reducers'

type StateProps = {
  error: string
  isLoaded: boolean
}
type DispatchProps = {
  getDataList: (dataType: FetchDataType, dataId?: string) => void
}
type Props = StateProps & DispatchProps

const PageTemplate: React.FC<Props> = ({
  error,
  children,
  isLoaded,
  getDataList
}) => {
  const { userId, postId } = useParams()

  useEffect(() => {
    if (userId && postId) getDataList('comments', postId)
    if (userId && postId === undefined) getDataList('posts', userId)
    if (userId === undefined && postId === undefined) getDataList('users')
  }, [userId, postId, getDataList])

  if (!isLoaded || error !== '') {
    return <>{!isLoaded ? <Loader /> : <Error error={error} />}</>
  }
  return <>{children}</>
}
// not sure where is better to get this data in template
// or in every view and pass it to PageTemplate
const mapStateToProps = (state: RootState): StateProps => ({
  isLoaded: state.isLoaded,
  error: state.error
})
const mapDispatchToProps = (dispatch: DispatchType): DispatchProps => ({
  getDataList: (dataType: FetchDataType, dataId?: string): void =>
    dispatch(getData(dataType, dataId))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
  //  { getDataList: getData }
)(PageTemplate)
