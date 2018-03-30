<?php
/**
 * File Name: index.php
 * Description: Main Page
 *
 * @author: Analia Mok
 */

require_once('partials/header.php');
?>

<main class="wrapper">
  <div id="image">
    <img src="social-github.png" alt="github logo">
  </div>
  <div id="content">
    <h1>Analia Mok | GitHub Respositories</h1>
    <div id="filter-bar">
      <?php
        $languages = array('All', 'PHP', 'Java', 'C', 'JavaScript', 'HTML', 'CSS');
      ?>

      <div id="custom-select">
        <select id="language-select">
          <?php foreach($languages as $language): ?>
            <option value="<?php echo $language; ?>"><?php echo $language; ?></option>
          <?php endforeach; ?>
        </select>
      </div>

    </div><!-- #filter-bar -->

    <div class="grid"></div>

<?php require_once('partials/footer.php'); ?>
