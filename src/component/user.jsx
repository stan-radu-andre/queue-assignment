import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import styled from "styled-components";
import Avatar from '../assets/avatar-placeholder.svg';
import Remove from '../assets/remove.svg';

export function User(props) {
  const { user } = props;
  const {
    email,
    firstName,
    lastName,
    status
  } = user;

  return (
    <tr>
      <td className='flex items-center gap-3'><img src={Avatar} alt="avatar image" />{firstName} {lastName}</td>
      <td>{email}</td>
      <td>{status}</td>
      <td><div className="gap-2 text-slate-500 delete-button" onClick={() => props.onRemoveUser(user)}><img src={Remove} alt="delete" />Delete</div></td>
    </tr>
  );
}
