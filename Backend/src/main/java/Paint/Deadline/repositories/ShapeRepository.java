package Paint.Deadline.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Paint.Deadline.Abstract.Shape;

@Repository
public interface ShapeRepository extends JpaRepository<Shape,Long> {

}
