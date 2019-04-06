import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Button, Col, Row} from 'react-bootstrap'
import { MdThumbUp, MdThumbDown, MdComment, MdBookmarkBorder, MdDelete } from "react-icons/md"
import { handleUpdateVotePost, handleDeletePost } from '../actions/posts'

class Post extends Component {
  handleVoteScoreUp = (e) => {
    e.preventDefault()
    this.handleVoteScore('upVote')
  }

  handleVoteScoreDown = (e) => {
    e.preventDefault()
    this.handleVoteScore('downVote')
  }

  handleVoteScore = (option) => {
    const { dispatch, post, indexStore } = this.props

    dispatch(handleUpdateVotePost({
      postId: post.id,
      postKey: indexStore,
      option: option
    }))
  }

  handleDelete = (e) => {
    e.preventDefault()
    const { dispatch, indexStore } = this.props
    
    dispatch(handleDeletePost({
      postId: this.props.post.id,
      postKey: parseInt(indexStore)
    }))
  }
  
  render() {
    return (
      <Card className='mb-2'>
        <Card.Body>
          <Card.Title>
            <Row>
              <Col>{this.props.post.title}</Col>
              <Col md="auto">
                <Button size="sm" variant="danger" onClick={this.handleDelete}>
                  <MdDelete />
                </Button>
              </Col>

            </Row>
          
          </Card.Title>
          <Card.Text>{this.props.post.body}</Card.Text>
          
          <Row className='text-muted'>
            <Col >
              Posted by @{this.props.post.author}
            </Col>
            <Col md="auto" >
              <MdBookmarkBorder /> {this.props.post.category}
            </Col>
            <Col md="auto" >
              <MdComment /> {this.props.post.commentCount}
            </Col>
            <Col md="auto" >
                <Button size="sm" variant="primary" className='mr-1' onClick={this.handleVoteScoreUp}>
                  <MdThumbUp />
                </Button>
                <Button size="sm" variant="warning" className='mr-3' onClick={this.handleVoteScoreDown}>
                  <MdThumbDown />
                </Button>
                  {this.props.post.voteScore}
            </Col>
            <Col md="auto" >
              {new Intl.DateTimeFormat('pt-BR', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(this.props.post.timestamp)}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )
  }
}

function mapStateToProps ({ posts }, { id }) {
  const post = posts[id]
  return {
    indexStore: id,
    post: post
  }
}

export default connect(mapStateToProps)(Post)